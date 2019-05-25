import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingService) {

  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getAllIngredients();
   this.subscription=  this.shoppingListService.shoppingSelected.subscribe(
      (ingredients: Ingredient[]) => {this.ingredients = ingredients}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
