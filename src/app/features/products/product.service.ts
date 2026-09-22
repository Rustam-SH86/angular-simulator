import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable, Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { IProduct } from './interfaces/IProduct';
import { IProductResponse } from './interfaces/IProductResponse';
import { ProductApiService } from './product-api.service';
import { ProductSortField, SortOrder } from './product-sort.types';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productApiService = inject(ProductApiService);
  private readonly messageService = inject(MessageService);

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  private readonly _products = signal<IProduct[]>([]);
  readonly products = this._products.asReadonly();

  private readonly _total = signal(0);
  readonly total = this._total.asReadonly();

  private readonly _page = signal(1);
  readonly page = this._page.asReadonly();

  private readonly _pageSize = signal(10);
  readonly pageSize = this._pageSize.asReadonly();

  readonly skip = computed(() => (this._page() - 1) * this._pageSize());

  private readonly _searchQuery = signal('');
  readonly searchQuery = this._searchQuery.asReadonly();

  private readonly _sortField = signal<ProductSortField>('title');
  readonly sortField = this._sortField.asReadonly();

  private readonly _sortOrder = signal<SortOrder>('asc');
  readonly sortOrder = this._sortOrder.asReadonly();

  private readonly _categories = signal<string[]>([]);
  readonly categories = this._categories.asReadonly();

  private readonly _selectedCategory = signal<string | null>(null);
  readonly selectedCategory = this._selectedCategory.asReadonly();

  private activeRequest?: Subscription;

  loadCategories(): void {
    this.productApiService.getCategories().subscribe({
      next: (categories) => this._categories.set(categories),
      error: (error) => this.messageService.showError('Failed to load categories', error),
    });
  }

  loadProducts(): void {
    this.activeRequest?.unsubscribe();
    this._loading.set(true);

    const query = this._searchQuery().trim();
    const category = this._selectedCategory();
    const skip = this.skip();
    const limit = this.pageSize();
    const sortBy = this._sortField();
    const order = this._sortOrder();

    let request$: Observable<IProductResponse>;

    if (category && query) {
      request$ = this.productApiService.searchProduct(query, 0, 0, sortBy, order).pipe(
        map((response) => {
          const matches = response.products.filter((product) => product.category === category);

          return {
            ...response,
            products: matches.slice(skip, skip + limit),
            total: matches.length,
            skip,
            limit,
          };
        }),
      );
    } else if (category) {
      request$ = this.productApiService.getProductsByCategory(category, skip, limit, sortBy, order);
    } else if (query) {
      request$ = this.productApiService.searchProduct(query, skip, limit, sortBy, order);
    } else {
      request$ = this.productApiService.getProducts(skip, limit, sortBy, order);
    }

    this.activeRequest = request$.pipe(finalize(() => this._loading.set(false))).subscribe({
      next: (response) => {
        this._products.set(response.products);
        this._total.set(response.total);
      },
      error: (error) => {
        this.messageService.showError('Failed to load products', error);
      },
    });
  }

  setPagination(newPage: number, newPageSize: number): void {
    this._page.set(newPage);
    this._pageSize.set(newPageSize);
    this.loadProducts();
  }

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
    this._page.set(1);
    this.loadProducts();
  }

  setSorting(field: ProductSortField, order: SortOrder): void {
    this._sortField.set(field);
    this._sortOrder.set(order);
    this._page.set(1);
    this.loadProducts();
  }

  setCategory(category: string | null): void {
    this._selectedCategory.set(category);
    this._page.set(1);
    this.loadProducts();
  }
}
