import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostApiService } from './post-api.service';
import { IPost } from './post';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { PostEditDialogComponent } from './post-edit-dialog.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule, SkeletonModule, ContextMenuModule, PostEditDialogComponent, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  private postApiService = inject(PostApiService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  editPost: IPost | null = null;
  editDialogVisible = false;

  selectedPost: IPost | null = null;

  contextMenuItems: MenuItem[] = [
    {
      label: 'View',
      icon: 'pi pi-eye',
      command: () => {
        if (this.selectedPost) {
          this.router.navigate(['/posts', this.selectedPost.id]);
        }
      },
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        if (this.selectedPost) {
          this.editPost = { ...this.selectedPost };
          this.editDialogVisible = true;
        }
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        if (this.selectedPost?.id !== undefined) {
          const postId = this.selectedPost.id;
          this.postApiService.deletePost(postId).subscribe({
            next: () => {
              this.posts = this.posts.filter((post) => post.id != postId);
              this.totalRecords--;
              this.selectedPost = null;
              this.cd.detectChanges();
            },
          });
        }
      },
    },
  ];

  posts: IPost[] = [];
  skip = 0;
  limit = 10;
  totalRecords = 0;
  loading = false;

  loadPosts(): void {
    this.loading = true;

    this.postApiService.getPosts(this.skip, this.limit).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.totalRecords = response.total;
        this.loading = false;

        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cd.detectChanges();
      },
    });
  }

  onPageChange(event: TableLazyLoadEvent): void {
    this.skip = event.first ?? 0;
    this.limit = event.rows ?? this.limit;
    this.loadPosts();
  }

  onRowDoubleClick(post: IPost): void {
    this.router.navigate(['/posts', post.id]);
  }

  onSavePost(updatedPost: IPost): void {
    if (updatedPost.id === undefined) {
      return;
    }
    this.postApiService.updatePost(updatedPost.id, updatedPost).subscribe({
      next: (response) => {
        this.posts = this.posts.map((post) => (post.id === response.id ? response : post));

        this.editDialogVisible = false;
        this.editPost = null;
        this.cd.detectChanges();
      },
    });
  }

  onCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }
}
