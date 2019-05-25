import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('linkInput') linkInputRef: ElementRef;

   id : number;
   editMode = false;


  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  this.route.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    }
  )
  }

  onAddRecipe() {

    const recipeName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);

    // this.recipeService.

  }
}


// public name: string;
// public description: string;
// public imagePath: string;
// public ingredients: Ingredient[];
