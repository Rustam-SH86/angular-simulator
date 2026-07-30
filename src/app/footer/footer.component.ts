import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '../services/message.service';
import { faTelegram, faPinterest, faVk, faSkype } from '@fortawesome/free-brands-svg-icons';;
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  imports: [FormsModule,FontAwesomeModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public messageService: MessageService = inject(MessageService);

  protected readonly faTelegram = faTelegram;
  protected readonly faPinterest = faPinterest;
  protected readonly  faVkontakte = faVk;
  protected readonly  faSkype = faSkype;
  protected readonly faChevronRight = faChevronRight;


}
