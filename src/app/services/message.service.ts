import { Injectable } from '@angular/core';
import { MessageType } from '../enums/message.enums';
import { IMessage } from '../interfaces/message.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private currentId = 0;

  private addMessage(type: MessageType, text: string): void {
    const message: IMessage = {
      id: ++this.currentId,
      type,
      text,
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([message, ...currentMessages]);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = currentMessages.filter((message) => message.id !== id);
    this.messagesSubject.next(updatedMessages);
  }

  showWarn(text: string): void {
    this.addMessage(MessageType.WARN, text);
  }

  showError(text: string): void {
    this.addMessage(MessageType.ERROR, text);
  }

  showSuccess(text: string): void {
    this.addMessage(MessageType.SUCCESS, text);
  }

  showInfo(text: string): void {
    this.addMessage(MessageType.INFO, text);
  }
}
