import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface IAuthResponse {
  kind : string;
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

signUp(email: string, password: string){
 return  this.http.post<IAuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBihmggsyQfDeCHbGv-ZrzeldQm_mSzh6k',
   {email: email, password: password, returnSecureToken: true})
}

}
