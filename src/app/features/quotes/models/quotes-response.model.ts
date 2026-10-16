import { IQuote } from './quote.model';

export interface IQuotesResponse {
  quotes: IQuote[];
  total: number;
  skip: number;
  limit: number;
}
