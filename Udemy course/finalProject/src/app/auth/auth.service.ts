import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';


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

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
   return  this.http.post<IAuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBihmggsyQfDeCHbGv-ZrzeldQm_mSzh6k',
     {email: email, password: password, returnSecureToken: true})
     .pipe(catchError(this.handleError))
  }



  login(email: string, password: string){
    return  this.http.post<IAuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBihmggsyQfDeCHbGv-ZrzeldQm_mSzh6k',
      {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(this.handleError))
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
}
