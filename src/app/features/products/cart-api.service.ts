import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartApiResponse } from './interfaces/ICartApiResponse';
import { ICartItem } from './interfaces/ICartItem';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private readonly http = inject(HttpClient);
  private readonly cartId = 1;

  saveCart(items: readonly ICartItem[]): Observable<ICartApiResponse> {
    return this.http.put<ICartApiResponse>(`https://dummyjson.com/carts/${this.cartId}`, {
      merge: false,
      products: items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      })),
    });
  }

  deleteCart(): Observable<ICartApiResponse> {
    return this.http.delete<ICartApiResponse>(`https://dummyjson.com/carts/${this.cartId}`);
  }
}
