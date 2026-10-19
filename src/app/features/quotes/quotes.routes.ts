import { Routes } from '@angular/router';

import { QuotesListComponent } from './pages/quotes-list/quotes-list.component';

export const QUOTES_ROUTES: Routes = [
  {
    path: '',
    component: QuotesListComponent,
  },
];
