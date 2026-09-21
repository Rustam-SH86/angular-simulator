import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './interfaces/IProduct';
import { CartService } from './cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly product = this.route.snapshot.data['product'] as IProduct;

  private readonly cartService = inject(CartService);
  readonly itemCount = this.cartService.itemCount;
  readonly saving = this.cartService.saving;

  addToCart(): void {
    this.cartService.addProduct(this.product);
  }
}
