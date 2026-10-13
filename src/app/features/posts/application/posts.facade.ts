import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { MessageService } from '../../../core/feedback/messages/message.service';
import { PostsApiService } from '../data-access/posts-api.service';
import { IPost } from '../models/post.model';

@Injectable()
export class PostsFacade {
  private readonly postsApi = inject(PostsApiService);
  private readonly messageService = inject(MessageService);

  private readonly postsState = signal<IPost[]>([]);
  readonly posts = this.postsState.asReadonly();

  private readonly totalState = signal(0);
  readonly total = this.totalState.asReadonly();

  private readonly loadingState = signal(false);
  readonly loading = this.loadingState.asReadonly();

  loadPosts(skip: number, limit: number): void {
    this.loadingState.set(true);

    this.postsApi
      .getPosts(skip, limit)
      .pipe(finalize(() => this.loadingState.set(false)))
      .subscribe({
        next: (response) => {
          this.postsState.set(response.posts);
          this.totalState.set(response.total);
        },
        error: (error) => this.messageService.showError('Failed to load posts', error),
      });
  }

  deletePost(postId: number): void {
    this.postsApi.deletePost(postId).subscribe({
      next: () => {
        this.postsState.update((posts) => posts.filter((post) => post.id !== postId));
        this.totalState.update((total) => Math.max(0, total - 1));
      },
      error: (error) => this.messageService.showError('Failed to delete post', error),
    });
  }

  updatePost(post: IPost): void {
    if (post.id === undefined) {
      return;
    }

    this.postsApi.updatePost(post.id, post).subscribe({
      next: (updatedPost) => {
        this.postsState.update((posts) =>
          posts.map((currentPost) =>
            currentPost.id === updatedPost.id ? updatedPost : currentPost,
          ),
        );
      },
      error: (error) => this.messageService.showError('Failed to update post', error),
    });
  }

  createPost(post: Omit<IPost, 'id'>): Observable<IPost> {
    return this.postsApi.createPost(post).pipe(
      tap((createdPost) => {
        this.postsState.update((posts) => [createdPost, ...posts]);
        this.totalState.update((total) => total + 1);
      }),
      catchError((error: unknown) => {
        this.messageService.showError('Failed to create post', error);
        return EMPTY;
      }),
    );
  }
}
