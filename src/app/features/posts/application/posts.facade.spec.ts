import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MessageService } from '../../../core/feedback/messages/message.service';
import { PostsApiService } from '../data-access/posts-api.service';
import { IPost } from '../models/post.model';
import { PostsFacade } from './posts.facade';

describe('PostsFacade', () => {
  const posts: IPost[] = [
    { id: 1, title: 'First post', body: 'First body', tags: [], views: 10, userId: 1 },
    { id: 2, title: 'Second post', body: 'Second body', tags: [], views: 20, userId: 1 },
  ];

  const postsApi = {
    getPosts: vi.fn(() =>
      of({
        posts,
        total: posts.length,
        skip: 0,
        limit: 10,
      }),
    ),
    deletePost: vi.fn(() => of(undefined)),
    updatePost: vi.fn((_: number, post: IPost) => of(post)),
    createPost: vi.fn((post: Omit<IPost, 'id'>) => of({ ...post, id: 3 })),
  };

  const messages = {
    showError: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        PostsFacade,
        { provide: PostsApiService, useValue: postsApi },
        { provide: MessageService, useValue: messages },
      ],
    });
  });

  it('loads a page of posts', () => {
    const facade = TestBed.inject(PostsFacade);

    facade.loadPosts(0, 10);

    expect(postsApi.getPosts).toHaveBeenCalledWith(0, 10);
    expect(facade.posts()).toEqual(posts);
    expect(facade.total()).toBe(2);
    expect(facade.loading()).toBe(false);
  });

  it('removes a deleted post from the current page', () => {
    const facade = TestBed.inject(PostsFacade);
    facade.loadPosts(0, 10);

    facade.deletePost(1);

    expect(facade.posts()).toEqual([posts[1]]);
    expect(facade.total()).toBe(1);
  });

  it('replaces an updated post in the current page', () => {
    const facade = TestBed.inject(PostsFacade);
    const updatedPost: IPost = { ...posts[0], title: 'Updated title' };
    facade.loadPosts(0, 10);

    facade.updatePost(updatedPost);

    expect(facade.posts()[0]).toEqual(updatedPost);
  });
});
