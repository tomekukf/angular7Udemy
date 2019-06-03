import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor{

  constructor(private authService: AuthService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    return this.authService.userSubject.pipe(take(1),
      exhaustMap(user => {
        if (!user){
          console.log( 'user should be null' + user)
          return next.handle(req);
        }
        console.log( 'user should not  be null' + user)

        const modReq = req.clone({
          params: new HttpParams().set('auth',user.token)
        })
        return next.handle(modReq);

        }
      )
    )
  }

}
