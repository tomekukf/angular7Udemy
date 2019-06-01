import {Component, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  // @ViewChild('recipeEditForm') tableBody: Form;

  recipeForm: FormGroup;

  id : number;
   editMode = false;



  constructor(private recipeService: RecipesService,
              private acitveRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
   this.acitveRoute.params.subscribe(
     (params: Params) => {
       this.id = +params['id'];
       this.editMode = params['id'] != null;
       this.initForm();
     })
  }

  // // we are creating here new object with format of recipe
  // onSubmit() {
  //   const recipe =  new Recipe(
  //     this.recipeForm.value['name'],
  //     this.recipeForm.value['description'],
  //     this.recipeForm.value['imagePath'],
  //     this.recipeForm.value['ingredients']);
  //   if(this.editMode){
  //     this.recipeService.updateRecipe(this.id,recipe);
  //   }else {
  //     this.recipeService.addRecipe(recipe)
  //   }

  // We car use  this.recipeForm.value beacuse object there shoud have fomrat of recipe
    onSubmit() {

      if(this.editMode){
        this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      }else {
        this.recipeService.addRecipe(this.recipeForm.value)
      }
    this.onCancel()
    console.log(this.recipeForm)
   }

    private initForm(){
      let recipeName = '';
      let recipeURL = '';
      let recipeDesc = '';
      let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeURL= recipe.imagePath;
      recipeDesc= recipe.description;
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(recipeURL,Validators.required),
      'description': new FormControl(recipeDesc,Validators.required),
      'ingredients': recipeIngredients

    })
    }


  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/)
        ])
      })
    )
  }

  onCancel() {
    this.route.navigate(['../'],{relativeTo:this.acitveRoute});
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);

  }
}


// public name: string;
// public description: string;
// public imagePath: string;
// public ingredients: Ingredient[];
