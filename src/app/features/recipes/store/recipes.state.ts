import { IRecipe } from '../models/recipe.model';

export interface IRecipesState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
}

export const initialRecipesState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};
