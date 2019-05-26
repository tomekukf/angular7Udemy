import {Component, OnInit, EventEmitter, Output, Input, OnDestroy} from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
recipes: Recipe[];
subscriptons: Subscription;


  constructor(private  recipeService: RecipesService) {
    this.recipes= recipeService.getAllRecipes();
  }

  ngOnInit() {

   this.subscriptons = this.recipeService.recipeSubject.subscribe(
      (recipes: Recipe[])=>{
        this.recipes = recipes
      }
    )
  }

  ngOnDestroy() {
  this.subscriptons.unsubscribe()

  }


}
