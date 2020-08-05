import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map ,tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,private recipeService:RecipeService) { }

  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-app-cf3b5.firebaseio.com/recipes.json',recipes).subscribe(
      res=>{
        console.log(res)
      }
    )
  }
  fetchRecipes(){
   return this.http
    .get<Recipe[]>('https://recipe-app-cf3b5.firebaseio.com/recipes.json')
    .pipe(map(recipes =>{
      return recipes.map(x=>{
        return {...x,ingredients:x.ingredients?x.ingredients:[]};
      })
    }),
    tap(recipes =>{
      this.recipeService.setRecipes(recipes)
    })
    )
  }
}
