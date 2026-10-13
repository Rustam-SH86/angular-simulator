import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IProduct } from '../models/product.model';
import { ProductsApiService } from './products-api.service';

export const productResolver: ResolveFn<IProduct> = (route) => {
  const productsApi = inject(ProductsApiService);
  const productId = Number(route.paramMap.get('id'));

  return productsApi.getProduct(productId);
};
