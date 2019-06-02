import {Component, OnDestroy, OnInit} from '@angular/core';
import {SrverService} from '../shared/srver.service';
import {RecipesService} from '../recipes/recipes.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;

  subscriptions: Subscription;
  userSub: Subscription;

  constructor( private serverService : SrverService,
               private recipeService : RecipesService,
               private authService: AuthService){

  }

  onSave() {
  this.subscriptions= this.serverService.saveData().subscribe(
    (resolve: Response) => {
      console.log(resolve.body);
    }
  )
  }

  onFetch() {
    this.serverService.getData4().subscribe()
  }

  // onFetch1() {
  //   this.subscriptions = this.serverService.getData3().subscribe(
  //     (res )=> {
  //       console.log(res);
  //     }
  //   )}

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.authService.userSubject.subscribe(
      (user) => {
        this.isAuthenticated = !user? false : true;
      })
  }
}
