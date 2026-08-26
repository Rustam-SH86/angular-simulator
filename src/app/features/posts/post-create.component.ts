import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IPost } from './post';
import { FormsModule } from '@angular/forms';
import { PostApiService } from './post-api.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  template: '',
  imports: [FormsModule],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  private postApiService = inject(PostApiService);
  private router = inject(Router);
  private http = inject(HttpClient);
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

    this.postApiService.createPost(postToCreate).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }
}
