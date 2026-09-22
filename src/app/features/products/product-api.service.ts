import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponse } from './interfaces/IProductResponse';
import { ProductSortField, SortOrder } from './product-sort.types';
import { IProduct } from './interfaces/IProduct';
@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private http: HttpClient = inject(HttpClient);

  getProducts(
    skip: number,
    limit: number,
    sortBy: ProductSortField = 'title',
    order: SortOrder = 'asc',
  ): Observable<IProductResponse> {
    return this.http.get<IProductResponse>('https://dummyjson.com/products', {
      params: {
        skip,
        limit,
        sortBy,
        order,
      },
    });
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://dummyjson.com/products/${id}`);
  }

  searchProduct(
    query: string,
    skip: number,
    limit: number,
    sortBy: ProductSortField = 'title',
    order: SortOrder = 'asc',
  ): Observable<IProductResponse> {
    return this.http.get<IProductResponse>('https://dummyjson.com/products/search', {
      params: {
        q: query,
        skip,
        limit,
        sortBy,
        order,
      },
    });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://dummyjson.com/products/category-list');
  }

  getProductsByCategory(
    category: string,
    skip: number,
    limit: number,
    sortBy: ProductSortField = 'title',
    order: SortOrder = 'asc',
  ): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `https://dummyjson.com/products/category/${encodeURIComponent(category)}`,
      { params: { skip, limit, sortBy, order } },
    );
  }
}
