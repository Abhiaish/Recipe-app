import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = []
  //   new Recipe('A Tasty recipe','Buddha Bowl','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',[
  //     new Ingredient('Avacado',2),
  //     new Ingredient('Beans',1)
  //   ]),
  //   new Recipe('A Tasty recipe','Grilled Chicken','https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1510&q=80',[
  //     new Ingredient('chicken breast',1),
  //     new Ingredient('Small Potatoes',5)
  //   ]),
    
  // ]

  constructor(private slService: ShoppingListService) {}
  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
