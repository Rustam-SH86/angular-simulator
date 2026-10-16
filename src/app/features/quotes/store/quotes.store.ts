import { computed, inject } from '@angular/core';

import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';

import { IQuote } from '../models/quote.model';
import { QuotesApiService } from '../data-access/quotes-api.service';

export type QuotesFilter = 'all' | 'favorites';

interface IQuotesState {
  quotes: IQuote[];
  favorites: IQuote[];
  loading: boolean;
  error: string | null;
  filter: QuotesFilter;
  randomQuote: IQuote | null;
}

const initialState: IQuotesState = {
  quotes: [],
  favorites: [],
  loading: false,
  error: null,
  filter: 'all',
  randomQuote: null,
};

export const QuotesStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ quotes, favorites, filter }) => ({
    favoritesCount: computed(() => favorites().length),

    authorsCount: computed(() => new Set(quotes().map((quote) => quote.author)).size),

    filteredQuotes: computed(() => (filter() === 'favorites' ? favorites() : quotes())),
  })),

  withMethods((store, quotesApiService = inject(QuotesApiService)) => ({
    loadQuotes: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null, randomQuote: null })),
        switchMap(() =>
          quotesApiService.getQuotes().pipe(
            tap((response) => {
              patchState(store, {
                quotes: response.quotes,
                loading: false,
              });
            }),
            catchError(() => {
              patchState(store, {
                quotes: [],
                loading: false,
                error: 'Failed to load quotes. Please try again.',
              });

              return EMPTY;
            }),
          ),
        ),
      ),
    ),

    setFilter(filter: QuotesFilter): void {
      patchState(store, { filter });
    },

    toggleFavorite(quote: IQuote): void {
      patchState(store, ({ favorites }) => ({
        favorites: favorites.some((favorite) => favorite.id === quote.id)
          ? favorites.filter((favorite) => favorite.id !== quote.id)
          : [...favorites, quote],
      }));
    },

    isFavorite(quoteId: number): boolean {
      return store.favorites().some((favorite) => favorite.id === quoteId);
    },

    selectRandomQuote(): void {
      const quotes = store.quotes();

      if (quotes.length === 0) {
        patchState(store, { randomQuote: null });

        return;
      }

      const randomIndex = Math.floor(Math.random() * quotes.length);

      patchState(store, { randomQuote: quotes[randomIndex] });
    },
  })),
);
