import { Routes } from '@angular/router';
import { postResolver } from './features/posts/post.resolver';
import { authGuard } from './features/auth/auth.guard';
import { adminGuard } from './features/auth/admin.guard';
import { productResolver } from './features/products/product.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/posts/posts.component').then((m) => m.PostsComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'posts/create',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/posts/post-create.component').then((m) => m.PostCreateComponent),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard, adminGuard],
    resolve: {
      post: postResolver,
    },
    loadComponent: () =>
      import('./features/posts/post-detail.component').then((m) => m.PostDetailComponent),
  },
  {
    path: 'products/:id',
    resolve: {
      product: productResolver,
    },
    loadComponent: () =>
      import('./features/products/product-detail.component').then((m) => m.ProductDetailComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/products/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
