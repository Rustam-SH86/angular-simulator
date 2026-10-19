import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRecipesState } from './recipes.state';

export const RECIPES_FEATURE_KEY = 'recipes';

export const selectRecipesState = createFeatureSelector<IRecipesState>(RECIPES_FEATURE_KEY);

export const selectRecipes = createSelector(selectRecipesState, (state) => state.recipes);

export const selectLoading = createSelector(selectRecipesState, (state) => state.loading);

export const selectError = createSelector(selectRecipesState, (state) => state.error);
