import { createAction, props } from '@ngrx/store';
import { IRecipe } from '../models/recipe.model';

export const loadRecipes = createAction('[Recipes] Load Recipes');

export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes Success',
  props<{ recipes: IRecipe[] }>(),
);

export const loadRecipesFailure = createAction(
  '[Recipes] Load Recipes Failure',
  props<{ error: string }>(),
);
