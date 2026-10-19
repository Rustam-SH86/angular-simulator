import { IRecipe } from './recipe.model';

export interface IRecipesResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}
