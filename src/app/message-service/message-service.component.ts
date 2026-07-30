import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-service',
  imports: [CommonModule],
  templateUrl: './message-service.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './message-service.component.scss',
})
export class MessageServiceComponent {
  public messageService = inject(MessageService);
}
