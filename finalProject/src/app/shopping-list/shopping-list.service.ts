import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingService {

  shoppingSelected = new EventEmitter<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];



  addIngredientToList(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.shoppingSelected.emit(this.ingredients.slice());

  }
addIngredientsToList(ingredient: Ingredient[]){
    this.ingredients.push(...ingredient);
    this.shoppingSelected.emit(this.ingredients.slice());
}

  getAllIngredients (){
    return this.ingredients.slice();
  }

}
