import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {

  shoppingSelected = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];



  addIngredientToList(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.shoppingSelected.next(this.ingredients.slice());

  }
addIngredientsToList(ingredient: Ingredient[]){
    this.ingredients.push(...ingredient);
    this.shoppingSelected.next(this.ingredients.slice());
}

  getAllIngredients (){
    return this.ingredients.slice();
  }

}
