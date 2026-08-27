import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IPost } from './post';
import { PostApiService } from './post-api.service';

export const postResolver: ResolveFn<IPost> = (route) => {
  const postApiService = inject(PostApiService);
  const postId = Number(route.paramMap.get('id'));

  return postApiService.getPost(postId);
};
