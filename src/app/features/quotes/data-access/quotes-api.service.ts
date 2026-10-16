import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IQuotesResponse } from '../models/quotes-response.model';

@Injectable({ providedIn: 'root' })
export class QuotesApiService {
  private readonly http = inject(HttpClient);

  getQuotes(): Observable<IQuotesResponse> {
    return this.http.get<IQuotesResponse>('https://dummyjson.com/quotes');
  }
}
