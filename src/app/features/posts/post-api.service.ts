import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost, IPostResponse } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private http: HttpClient = inject(HttpClient);

  public getPosts(skip: number, limit: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>('https://dummyjson.com/posts', {
      params: {
        skip,
        limit,
      },
    });
  };

  public getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${id}`);
  };

  public deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`https://dummyjson.com/posts/${postId}`);
  };

  public updatePost(postId: number, partialPostData: Partial<IPost>): Observable<IPost> {
    return this.http.patch<IPost>(`https://dummyjson.com/posts/${postId}`, partialPostData);
  };

  public createPost(postData: Omit<IPost, 'id'>): Observable<IPost> {
    return this.http.post<IPost>('https://dummyjson.com/posts/add', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
