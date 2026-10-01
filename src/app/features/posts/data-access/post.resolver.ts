import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostsApiService } from './posts-api.service';
import { IPost } from '../models/post.model';

export const postResolver: ResolveFn<IPost> = (route) => {
  const postsApi = inject(PostsApiService);
  const postId = Number(route.paramMap.get('id'));

  return postsApi.getPost(postId);
};
