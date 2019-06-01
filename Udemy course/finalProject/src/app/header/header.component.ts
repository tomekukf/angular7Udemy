import {Component, OnDestroy} from '@angular/core';
import {SrverService} from '../shared/srver.service';
import {RecipesService} from '../recipes/recipes.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy{

  subscriptions: Subscription;

  constructor( private serverService : SrverService,
               private recipeService : RecipesService){

  }

  onSave() {
  this.subscriptions= this.serverService.saveData().subscribe(
    (resolve: Response) => {
      console.log(resolve.body);
    }
  )
  }

  onFetch() {
    this.serverService.getData3()
  }

  // onFetch1() {
  //   this.subscriptions = this.serverService.getData3().subscribe(
  //     (res )=> {
  //       console.log(res);
  //     }
  //   )}

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
