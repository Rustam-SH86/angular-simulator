import { inject, Injectable, signal } from '@angular/core';
import { MessageType } from './message-type.enum';
import { IMessage } from './message.model';
import { APP_CONFIG } from '../../config/app-config.token';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly appConfig = inject(APP_CONFIG);
  private readonly messagesState = signal<IMessage[]>([]);
  readonly messages = this.messagesState.asReadonly();
  private currentId = 0;

  private addMessage(type: MessageType, text: string): void {
    if (!this.appConfig.enableNotifications) {
      return;
    }
    const message: IMessage = {
      id: ++this.currentId,
      type,
      text,
    };

    this.messagesState.update((messages) => [message, ...messages]);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messagesState.update((messages) => messages.filter((message) => message.id !== id));
  }

  showWarn(text: string): void {
    this.addMessage(MessageType.WARN, text);
  }

  showError(text: string, error?: unknown): void {
    if (error !== undefined) {
      console.error(error);
    }
    this.addMessage(MessageType.ERROR, text);
  }

  showSuccess(text: string): void {
    this.addMessage(MessageType.SUCCESS, text);
  }

  showInfo(text: string): void {
    this.addMessage(MessageType.INFO, text);
  }
}
