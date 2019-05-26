import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  startedEditting = new Subject<number>()
  shoppingSelected = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];


  getIngredient(index: number){
    return this.ingredients[index];
  }

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

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient
    this.shoppingSelected.next(this.ingredients.slice());
  }

  deleteItem(index: number) {
    this.ingredients.splice(index,1);
    this.shoppingSelected.next(this.ingredients.slice())
  }
}
