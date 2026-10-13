import { Routes } from '@angular/router';
import { PostsFacade } from './application/posts.facade';
import { postResolver } from './data-access/post.resolver';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    providers: [PostsFacade],
    loadComponent: () =>
      import('./pages/posts-list/posts.component').then((component) => component.PostsComponent),
  },
  {
    path: 'create',
    providers: [PostsFacade],
    loadComponent: () =>
      import('./pages/post-create/post-create.component').then(
        (component) => component.PostCreateComponent,
      ),
  },
  {
    path: ':id',
    providers: [PostsFacade],
    resolve: {
      post: postResolver,
    },
    loadComponent: () =>
      import('./pages/post-detail/post-detail.component').then(
        (component) => component.PostDetailComponent,
      ),
  },
];
