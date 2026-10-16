import { createReducer, on } from '@ngrx/store';

import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';
import { initialRecipesState } from './recipes.state';

export const recipesReducer = createReducer(
  initialRecipesState,

  on(loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
    error: null,
  })),

  on(loadRecipesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
