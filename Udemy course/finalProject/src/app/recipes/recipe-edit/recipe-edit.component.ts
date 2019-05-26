import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @ViewChild('tableBody') tableBody: ElementRef;



  id : number;
   editMode = false;


  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit() {
  this.route.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    }
  )
  }

  onAddRecipe() {

    // const newIngredient = new Ingredient(ingName, ingAmount);

    // this.recipeService.

  }

  onRowAdd() {

    const tr = this.renderer.createElement('tr');
    const td = this.renderer.createElement('td');
    const textInput = this.renderer.createElement('input');
    const numberInput = this.renderer.createElement('input');
    const button = this.renderer.createElement('button');



    this.renderer.setAttribute(textInput,'type','text');
    this.renderer.setAttribute(numberInput,'type','number');
    this.renderer.setAttribute(button,'type','button');
    // this.renderer.setAttribute(button,'"(click)"','removeRowAdd()');

    this.renderer.addClass(textInput,'form-control');
    this.renderer.addClass(numberInput,'form-control');
    this.renderer.addClass(button,'form-control');
    this.renderer.addClass(button,'glyphicon');
    this.renderer.addClass(button,'glyphicon-plus');


    this.renderer.appendChild(tr, td);
    this.renderer.appendChild(td, textInput);
    this.renderer.appendChild(td, numberInput);
    this.renderer.appendChild(td, button);

    const text = this.renderer.createText('Hello world!');

    this.renderer.appendChild(this.tableBody.nativeElement,tr);
    // var html = '<div class="row dataPane"> Chunk of html elements </div>';
  }
  removeRowAdd(){
    console.log('here removing');
  }

  onSubmit() {

  }
}


// public name: string;
// public description: string;
// public imagePath: string;
// public ingredients: Ingredient[];
