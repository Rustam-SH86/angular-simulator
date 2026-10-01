import { Routes } from '@angular/router';
import { ProductsFacade } from './application/products.facade';
import { productResolver } from './data-access/product.resolver';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    providers: [ProductsFacade],
    loadComponent: () =>
      import('./pages/products-list/products.component').then(
        (component) => component.ProductsComponent,
      ),
  },
  {
    path: ':id',
    resolve: {
      product: productResolver,
    },
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(
        (component) => component.ProductDetailComponent,
      ),
  },
];

export const CART_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((component) => component.CartComponent),
  },
];
