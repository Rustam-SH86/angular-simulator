import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../../models/post.model';
import { FormsModule } from '@angular/forms';
import { PostsFacade } from '../../application/posts.facade';

@Component({
  selector: 'app-post-create',
  standalone: true,
  template: '',
  imports: [FormsModule],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  private readonly postsFacade = inject(PostsFacade);
  private readonly router = inject(Router);
  tagsText = '';

  newPost: Omit<IPost, 'id'> = {
    title: '',
    body: '',
    tags: [],
    views: 0,
    userId: 0,
  };

  createPost(): void {
    const postToCreate: Omit<IPost, 'id'> = {
      ...this.newPost,
      tags: this.tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    this.postsFacade.createPost(postToCreate).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
    });
  }
}
