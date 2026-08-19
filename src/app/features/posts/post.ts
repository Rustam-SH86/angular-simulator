export interface IPost {
  id?: number;
  title?: string;
  tags?: string[];
  views?: number;
  body?: string;
  userId?: number;
}

export interface IPostResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}