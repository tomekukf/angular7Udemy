import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {SrverService} from '../shared/srver.service';
import {RecipesService} from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements  Resolve<Recipe[]>{


  constructor(private recipeServe: SrverService,private recipeService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    let allRecipes = this.recipeService.getAllRecipes();

    if (allRecipes.length===0){
      return this.recipeServe.getData3();
    } else {
    return allRecipes
    }



  }
}
