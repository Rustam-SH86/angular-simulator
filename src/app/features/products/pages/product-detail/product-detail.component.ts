import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartFacade } from '../../application/cart.facade';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly product = this.route.snapshot.data['product'] as IProduct;

  private readonly cartFacade = inject(CartFacade);
  readonly itemCount = this.cartFacade.itemCount;
  readonly saving = this.cartFacade.saving;

  addToCart(): void {
    this.cartFacade.addProduct(this.product);
  }
}
