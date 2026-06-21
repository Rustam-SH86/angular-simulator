import { Component, inject } from '@angular/core';
import { MessageService } from '../../message.service/message.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public messageService: MessageService = inject(MessageService);
}
