import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ProductSortField, SortOrder } from './product-sort.types';
import { RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { IProduct } from './interfaces/IProduct';

@Component({
  selector: 'app-products',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    CardModule,
    SkeletonModule,
    PaginatorModule,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  readonly products = this.productService.products;
  readonly total = this.productService.total;
  readonly loading = this.productService.loading;
  readonly skeletonItems = Array.from({ length: 10 });
  readonly pageSize = this.productService.pageSize;
  readonly skip = this.productService.skip;
  readonly searchControl = new FormControl('', {
    nonNullable: true,
  });

  private readonly cartService = inject(CartService);

  readonly cartItemCount = this.cartService.itemCount;
  readonly cartSaving = this.cartService.saving;

  readonly categories = this.productService.categories;
  readonly selectedCategory = this.productService.selectedCategory;

  readonly sortField = this.productService.sortField;
  readonly sortOrder = this.productService.sortOrder;

  readonly sortOptions: { label: string; value: ProductSortField }[] = [
    { label: 'Title', value: 'title' },
    { label: 'Price', value: 'price' },
    { label: 'Rating', value: 'rating' },
    { label: 'Stock', value: 'stock' },
  ];

  readonly orderOptions: { label: string; value: SortOrder }[] = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  onSortOrderChange(order: SortOrder): void {
    this.productService.setSorting(this.sortField(), order);
  }

  onPageChange(event: PaginatorState): void {
    const page = (event.page ?? 0) + 1;
    const pageSize = event.rows ?? this.pageSize();

    this.productService.setPagination(page, pageSize);
  }

  onSortFieldChange(field: ProductSortField): void {
    this.productService.setSorting(field, this.sortOrder());
  }

  onCategoryChange(category: string | null): void {
    this.productService.setCategory(category);
  }

  addToCart(product: IProduct): void {
    this.cartService.addProduct(product);
  }

  ngOnInit(): void {
    this.productService.loadProducts();
    this.productService.loadCategories();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.productService.setSearchQuery(query);
      });
  }
}
