import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { IQuote } from '../../models/quote.model';
import { QuotesFilter, QuotesStore } from '../../store/quotes.store';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  templateUrl: './quotes-list.component.html',
  styleUrl: './quotes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesListComponent implements OnInit {
  readonly quotesStore = inject(QuotesStore);

  ngOnInit(): void {
    this.quotesStore.loadQuotes();
  }

  retry(): void {
    this.quotesStore.loadQuotes();
  }

  setFilter(filter: QuotesFilter): void {
    this.quotesStore.setFilter(filter);
  }

  toggleFavorite(quote: IQuote): void {
    this.quotesStore.toggleFavorite(quote);
  }

  selectRandomQuote(): void {
    this.quotesStore.selectRandomQuote();
  }
}
