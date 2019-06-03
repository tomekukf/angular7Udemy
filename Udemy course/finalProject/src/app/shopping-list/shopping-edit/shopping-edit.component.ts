import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('form', { static: true })formRef: NgForm;

  subscription: Subscription ;
  edditingMode = false;
  deletingMode= false;
  private index: number;
  edditedItem: Ingredient;

  constructor(private shoppingLiseService: ShoppingService) {

  }

  ngOnInit() {
    this.subscription= this.shoppingLiseService.startedEditting.subscribe(
      (index: number) => {
        this.edditingMode = true;
        this.deletingMode = true;
        this.index = index;
        this.edditedItem = this.shoppingLiseService.getIngredient(index);
        this.formRef.setValue({
          name: this.edditedItem.name,
          amount: this.edditedItem.amount

        })
      }
    )
  }

  // // with passing arguents
  // onAddItem(form: NgForm) {
  //   let formRef1 = form.value;
  //   const newIngredient = new Ingredient(formRef1.name, formRef1.amount);
  //
  //   this.shoppingLiseService.addIngredientToList(newIngredient);
  // }


  onSubmit() {
    let formRef1 = this.formRef.value;
    const newIngredient = new Ingredient(formRef1.name, formRef1.amount);
      if(this.edditingMode){
        console.log('editing'+ this.index + newIngredient.amount);
        this.shoppingLiseService.updateIngredient(this.index,newIngredient)
      }else {
        this.shoppingLiseService.addIngredientToList(newIngredient);
      }
    this.edditingMode=false;
    this.deletingMode=false;


  }

  ngOnDestroy() {

    this.subscription.unsubscribe()
  }



  onDeleteItem() {
    console.log('deleting item with index: ' + this.index)
    this.shoppingLiseService.deleteItem(this.index);
    this.onClear();
  }

  onClear() {
    this.formRef.reset();
this.edditingMode=false;
  }
}
