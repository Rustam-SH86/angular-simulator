import { IProduct } from './product.model';

export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
