import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsFacade } from '../../application/products.facade';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ProductSortField, SortOrder } from '../../models/product-sort.types';
import { RouterLink } from '@angular/router';
import { CartFacade } from '../../application/cart.facade';
import { IProduct } from '../../models/product.model';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly productsFacade = inject(ProductsFacade);
  readonly products = this.productsFacade.products;
  readonly total = this.productsFacade.total;
  readonly loading = this.productsFacade.loading;
  readonly skeletonItems = Array.from({ length: 10 });
  readonly pageSize = this.productsFacade.pageSize;
  readonly skip = this.productsFacade.skip;
  readonly searchControl = new FormControl('', {
    nonNullable: true,
  });

  private readonly cartFacade = inject(CartFacade);

  readonly cartItemCount = this.cartFacade.itemCount;
  readonly cartSaving = this.cartFacade.saving;

  readonly categories = this.productsFacade.categories;
  readonly selectedCategory = this.productsFacade.selectedCategory;

  readonly sortField = this.productsFacade.sortField;
  readonly sortOrder = this.productsFacade.sortOrder;

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
    this.productsFacade.setSorting(this.sortField(), order);
  }

  onPageChange(event: PaginatorState): void {
    const page = (event.page ?? 0) + 1;
    const pageSize = event.rows ?? this.pageSize();

    this.productsFacade.setPagination(page, pageSize);
  }

  onSortFieldChange(field: ProductSortField): void {
    this.productsFacade.setSorting(field, this.sortOrder());
  }

  onCategoryChange(category: string | null): void {
    this.productsFacade.setCategory(category);
  }

  addToCart(product: IProduct): void {
    this.cartFacade.addProduct(product);
  }

  ngOnInit(): void {
    this.productsFacade.loadProducts();
    this.productsFacade.loadCategories();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((query) => {
        this.productsFacade.setSearchQuery(query);
      });
  }
}
