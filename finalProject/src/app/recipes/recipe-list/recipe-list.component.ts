import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes : Recipe[] = [

    new  Recipe('banan cake',
      'delicious',
      'https://cdn.pixabay.com/photo/2018/11/05/12/42/food-3796017_960_720.jpg'),
    new Recipe('KFC chicken',
      'original receipt',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/KFC_Original_Recipe_chicken_in_bucket.jpg/800px-KFC_Original_Recipe_chicken_in_bucket.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
   this.recipeWasSelected.emit(recipe);
  }

}
