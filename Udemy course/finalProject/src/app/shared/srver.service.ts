import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {RecipesService} from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class SrverService {

  constructor(private http: HttpClient,private recipeService: RecipesService) {

  }


  getData(){
    return this.http.get('https://angular-recipe-book-udemy.firebaseio.com/recipes.json')

      .pipe(map(
          (reponseData) => {
            const arrayOfRecipe: Recipe[] = [];
            for ( const key in reponseData) {
              if (reponseData.hasOwnProperty(key)) {
                // arrayOfPost.push({...reponseData[key], id : key });
                arrayOfRecipe.push({...reponseData[key]});
              }
            }
            console.log(arrayOfRecipe)
            return arrayOfRecipe;
          }
        ))
  }


   // if properties of object are nested in JSON object we need to user for ...in loop
  getData1(){
    // return this.http.get<{[key: string]: Recipe}>('https://angular-recipe-book-udemy.firebaseio.com/recipes.json')
    return this.http.get('https://angular-recipe-book-udemy.firebaseio.com/recipes.json').pipe(map(
      (responseData) => {
        const arrayOfPost: Recipe[] = [];
        const arrayOfPost1: Recipe[] = [];
        for ( const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            // arrayOfPost.push({...reponseData[key], id: key });
            let message = {...responseData[key]};

            for (const i in message ){
              arrayOfPost1.push(message[i])
              this.recipeService.addRecipe(message[i]);
            }
            console.log(message)
            // arrayOfPost1.push()
            arrayOfPost.push({...responseData[key]});
          }
        }
        console.log(arrayOfPost);
        console.log(arrayOfPost1);
        return arrayOfPost;
      }
    ))
  }



  getData3() {
    return this.http.get<Recipe[]>('https://angular-recipe-book-udemy.firebaseio.com/recipes.json').pipe(map(
      recipes => {
        console.log(recipes)
        return recipes.map(recipe => {
          // return{...recipe, ingredients : [{'amount' : 1,'name' : 'tomek'},{'amount' : 1 ,'name' : 'tomek'}] };
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
      }
    ),tap(
      recipes=>{
        this.recipeService.setRecipes(recipes);
      }))};


  saveDataNotWorkingPerfectly(){
    return this.http.post('https://angular-recipe-book-udemy.firebaseio.com/recipes.json',this.recipeService.getAllRecipes()).pipe(map(
      (data: Response) => {
       console.log(data);
        return data;

      }
    ))
  }

  saveData(){
    return this.http.put
    ('https://angular-recipe-book-udemy.firebaseio.com/recipes.json',this.recipeService.getAllRecipes()).pipe(
      tap((res: Response)=>{
        console.log('1');
          console.log('data '+res.body)
          console.log(res)
        },
        err=>
          console.log(err)
      ))


  }

}
