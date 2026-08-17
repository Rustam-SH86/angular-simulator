import { Component, EventEmitter, Input,output,Output, } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { IPost } from './post';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [DialogModule, FormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {
  @Input() post: IPost | null = null;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save  = new EventEmitter<IPost>();
}
