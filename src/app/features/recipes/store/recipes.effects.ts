import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { RecipesApiService } from '../data-access/recipes-api.service';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';

@Injectable()
export class RecipesEffects {
  private readonly actions$ = inject(Actions);
  private readonly recipesApi = inject(RecipesApiService);

  readonly loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipes),

      exhaustMap(() =>
        this.recipesApi.getRecipes().pipe(
          map((response) =>
            loadRecipesSuccess({
              recipes: response.recipes,
            }),
          ),

          catchError(() =>
            of(
              loadRecipesFailure({
                error: 'Не удалось загрузить рецепты',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
