import { Component, inject } from '@angular/core';
import { MessageService } from '../../message.service/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-service',
  imports: [CommonModule],
  templateUrl: './message-service.component.html',
  styleUrl: './message-service.component.scss',
})
export class MessageServiceComponent {
  public messageService = inject(MessageService);
}
