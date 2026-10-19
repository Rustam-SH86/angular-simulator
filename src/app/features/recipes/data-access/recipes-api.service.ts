import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipesResponse } from '../models/recipes-response.model';

@Injectable({ providedIn: 'root' })
export class RecipesApiService {
  private readonly http = inject(HttpClient);

  getRecipes(): Observable<IRecipesResponse> {
    return this.http.get<IRecipesResponse>('https://dummyjson.com/recipes');
  }
}
