import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { MessageService } from '../../../core/feedback/messages/message.service';
import { CartApiService } from '../data-access/cart-api.service';
import { ICartItem } from '../models/cart-item.model';
import { IProduct } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private readonly cartApiService = inject(CartApiService);
  private readonly messageService = inject(MessageService);

  private readonly _items = signal<ICartItem[]>([]);
  readonly items = this._items.asReadonly();

  private readonly _saving = signal(false);
  readonly saving = this._saving.asReadonly();

  readonly itemCount = computed(() =>
    this._items().reduce((count, item) => count + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  readonly tax = computed(() => this.subtotal() * 0.2);

  readonly total = computed(() => this.subtotal() + this.tax());

  addProduct(product: IProduct): void {
    const items = this._items();

    const existing = items.find((item) => item.product.id === product.id);

    if (existing && existing.quantity >= product.stock) {
      return;
    }

    const nextItems = existing
      ? items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      : [...items, { product, quantity: 1 }];

    this.saveItems(nextItems);
  }

  increaseQuantity(productId: number): void {
    const items = this._items();

    const existing = items.find((item) => item.product.id === productId);

    if (!existing || existing.quantity >= existing.product.stock) {
      return;
    }

    const nextItems = items.map((item) =>
      item.product.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    this.saveItems(nextItems);
  }

  decreaseQuantity(productId: number): void {
    const items = this._items();

    const existing = items.find((item) => item.product.id === productId);

    if (!existing) {
      return;
    }

    const nextItems = items
      .map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    this.saveItems(nextItems);
  }

  removeProduct(productId: number): void {
    const nextItems = this._items().filter((item) => item.product.id !== productId);

    this.saveItems(nextItems);
  }

  clearCart(): void {
    if (this._saving() || this._items().length === 0) {
      return;
    }

    this._saving.set(true);

    this.cartApiService
      .deleteCart()
      .pipe(finalize(() => this._saving.set(false)))
      .subscribe({
        next: () => {
          this._items.set([]);
        },
        error: (error) => {
          this.messageService.showError('Failed to clear cart', error);
        },
      });
  }

  private saveItems(nextItems: ICartItem[]): void {
    if (this._saving()) {
      return;
    }

    if (nextItems.length === 0) {
      this.clearCart();
      return;
    }

    this._saving.set(true);

    this.cartApiService
      .saveCart(nextItems)
      .pipe(finalize(() => this._saving.set(false)))
      .subscribe({
        next: () => {
          this._items.set(nextItems);
        },
        error: (error) => {
          this.messageService.showError('Failed to update cart', error);
        },
      });
  }
}
