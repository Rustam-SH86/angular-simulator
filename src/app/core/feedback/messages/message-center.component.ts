import { Component, inject } from '@angular/core';
import { MessageService } from './message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-center',
  imports: [CommonModule],
  templateUrl: './message-center.component.html',
  styleUrl: './message-center.component.scss',
})
export class MessageCenterComponent {
  readonly messageService = inject(MessageService);
}
