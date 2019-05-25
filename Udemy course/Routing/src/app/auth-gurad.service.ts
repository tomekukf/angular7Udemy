import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable(

)
export class AuthGuradService implements  CanActivate, CanActivateChild{

  constructor(private authService: AuthService, private route: Router) { }
// we are expecting Observable type in case this methid
// wil lca called asynchous or Promise of boolean type if methoid will ba called syncho..
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    return this.authService.isAuthenticated().then(
     (auth: boolean) => {
       if (auth) {
         return true;
       } else {
         this.route.navigate(['/']);
       }
     }
   );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
