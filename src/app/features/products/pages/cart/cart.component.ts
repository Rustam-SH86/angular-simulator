import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartFacade } from '../../application/cart.facade';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly cartFacade = inject(CartFacade);

  readonly items = this.cartFacade.items;
  readonly itemCount = this.cartFacade.itemCount;
  readonly subtotal = this.cartFacade.subtotal;
  readonly tax = this.cartFacade.tax;
  readonly total = this.cartFacade.total;
  readonly saving = this.cartFacade.saving;

  increaseQuantity(productId: number): void {
    this.cartFacade.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartFacade.decreaseQuantity(productId);
  }

  removeProduct(productId: number): void {
    this.cartFacade.removeProduct(productId);
  }

  clearCart(): void {
    this.cartFacade.clearCart();
  }
}
