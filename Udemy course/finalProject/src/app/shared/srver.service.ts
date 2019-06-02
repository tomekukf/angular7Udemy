import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {RecipesService} from '../recipes/recipes.service';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SrverService {

  constructor(private http: HttpClient,
              private recipeService: RecipesService,
              private authService: AuthService) {

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
    return this.authService.userSubject.pipe(
      //we can take vaaues from last object in chain with this beahvoiurSubject
      take(1),
      //we need to return our observable(subject) to be able to subscribe it later
      exhaustMap(user => {
        return this.http.get<Recipe[]>('https://angular-recipe-book-udemy.firebaseio.com/recipes.json',{params: new HttpParams().set('auth',user.token))}

      ) ,
      //simply adding next chain operator on data via comma
      map(
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
