import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable()
export class RecipesService {

  constructor(private spSercice: ShoppingService) {
  }

  recipeSubject = new Subject();
  recipes : Recipe[] = []

  // recipes : Recipe[] = [
  //
  //   new  Recipe('banan cake',
  //     'delicious',
  //     'https://cdn.pixabay.com/photo/2018/11/05/12/42/food-3796017_960_720.jpg', [
  //       new Ingredient('banana', 1  ),
  //       new Ingredient('flour', 200 )
  //     ] ),
  //
  //   new Recipe('KFC chicken',
  //     'original receipt',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/KFC_Original_Recipe_chicken_in_bucket.jpg/800px-KFC_Original_Recipe_chicken_in_bucket.jpg',
  //     [
  //       new Ingredient('chicken', 4  ),
  //       new Ingredient('flour', 500  )
  //
  //     ])
  // ];



  getAllRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
    // return this.recipes.slice()[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.spSercice.addIngredientsToList(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipeSubject.next(this.recipes.slice())

  }
  recipesArray: Recipe[] = [] ;



  addRecipes(recipe: Recipe[]){
    console.log('adding recipes'
    )
    // console.log(this.recipes);
    // console.log(recipe);
    console.log(recipe.length)

  recipe.map(
  (elem) =>{
    console.log(elem[0])
    console.log(elem[1])

    this.addRecipe(elem[0]);
    this.addRecipe(elem[1]);
  })
    console.log(this.recipesArray)




  }




  updateRecipe(index:number, newRecipe: Recipe){
    this.recipes[index] = newRecipe
    this.recipeSubject.next(this.recipes.slice())
  }

  delteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeSubject.next(this.recipes.slice())
  }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeSubject.next(this.recipes.slice())
  }
}
