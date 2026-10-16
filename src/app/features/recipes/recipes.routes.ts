import { Routes } from '@angular/router';

import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    component: RecipesListComponent,
  },
];
