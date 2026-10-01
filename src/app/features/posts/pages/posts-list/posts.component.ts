import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PostsFacade } from '../../application/posts.facade';
import { IPost } from '../../models/post.model';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { PostEditDialogComponent } from '../../ui/post-edit-dialog/post-edit-dialog.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule, SkeletonModule, ContextMenuModule, PostEditDialogComponent, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  private readonly postsFacade = inject(PostsFacade);
  private readonly router = inject(Router);
  readonly posts = this.postsFacade.posts;
  readonly totalRecords = this.postsFacade.total;
  readonly loading = this.postsFacade.loading;

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
          this.postsFacade.deletePost(postId);
          this.selectedPost = null;
        }
      },
    },
  ];

  skip = 0;
  limit = 10;

  loadPosts(): void {
    this.postsFacade.loadPosts(this.skip, this.limit);
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
    this.postsFacade.updatePost(updatedPost);
    this.editDialogVisible = false;
    this.editPost = null;
  }

  onCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }
}
