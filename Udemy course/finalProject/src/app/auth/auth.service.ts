import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';


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

  constructor(private http: HttpClient) { }

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
    this.userSubject.next(user);

  }


}
