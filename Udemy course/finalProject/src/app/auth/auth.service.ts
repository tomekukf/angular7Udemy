import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';


export interface IAuthResponse {
  kind : string;
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(email: string, password: string){
   return  this.http.post<IAuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBihmggsyQfDeCHbGv-ZrzeldQm_mSzh6k',
     {email: email, password: password, returnSecureToken: true})
     .pipe(catchError(this.handleError)
       // , tap(
       //   (respData) => {
       //     this.handleAuth(
       //       respData.email,
       //       respData.localId,
       //       respData.idToken,
       //       +respData.expiresIn);
       //   })
     )
  }



  login(email: string, password: string){
    return  this.http.post<IAuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBihmggsyQfDeCHbGv-ZrzeldQm_mSzh6k',
      {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(this.handleError),
        tap(
          (respData) => {
            this.handleAuth(
              respData.email,
              respData.localId,
              respData.idToken,
              +respData.expiresIn);
          }))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage= 'Unknown error occured '
    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
  }
    switch (    errorMessage = errorRes.error.error.message) {
      case 'EMAIL_EXISTS': errorMessage = 'This email is allready used'
            break;
      case 'EMAIL_NOT_FOUND': errorMessage = ' Did not find email';
            break
      case 'INVALID_PASSWORD': errorMessage = ' The password is invalid or the user does not have a password';
        break
      case 'USER_DISABLED': errorMessage = ' The user account has been disabled by an administrator';
        break
    }
    return throwError(errorMessage);
  }

  private handleAuth(email: string, localId: string, idToken: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(
      email,
      localId,
      idToken,
      expDate);
    console.log('================')
    console.log(user);
    this.userSubject.next(user);
    this.autoLogout(expiresIn*1000)
    localStorage.setItem('userData',JSON.stringify(user))
    // sessionStorage.
  }

  autologin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return ;
    }
    const user = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpDate))
    if (user.token) {
      const expirationDuration =
        new Date(userData._tokenExpDate).getTime() -
      new Date().getTime();
      this.autoLogout(expirationDuration);
      this.userSubject.next(user)
    }

  }
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
  this.logout()
    },3000)
  }


  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }
}
