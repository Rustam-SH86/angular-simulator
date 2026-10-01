import { Routes } from '@angular/router';
import { adminGuard } from './core/auth/admin.guard';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/home/home.routes').then((routes) => routes.HOME_ROUTES),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./features/users/users.routes').then((routes) => routes.USERS_ROUTES),
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./features/posts/posts.routes').then((routes) => routes.POSTS_ROUTES),
  },

  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((routes) => routes.AUTH_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes').then((routes) => routes.PRODUCTS_ROUTES),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/products/products.routes').then((routes) => routes.CART_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/layout/not-found-page/not-found-page.component').then(
        (component) => component.NotFoundPageComponent,
      ),
  },
];
