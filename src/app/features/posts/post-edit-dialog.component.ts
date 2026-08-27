import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IPost } from './post';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [DialogModule, FormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {
  private _post: IPost | null = null;

  @Input() visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<IPost>();

  tagsText = '';

  @Input()
  set post(value: IPost | null) {
    this._post = value;
    this.tagsText = value?.tags?.join(', ') ?? '';
  }

  get post(): IPost | null {
    return this._post;
  }

  onSave(): void {
    if (!this.post) {
      return;
    }

    this.save.emit({
      ...this.post,
      tags: this.tagsText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  }
}
