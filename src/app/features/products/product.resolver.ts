import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IProduct } from './interfaces/IProduct';
import { ProductApiService } from './product-api.service';

export const productResolver: ResolveFn<IProduct> = (route) => {
  const productApiService = inject(ProductApiService);
  const productId = Number(route.paramMap.get('id'));

  return productApiService.getProduct(productId);
};
