import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((component) => component.HomePageComponent),
  },
];
