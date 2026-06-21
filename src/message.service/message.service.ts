import { Injectable } from '@angular/core';
import { MessageType } from './message.enums';
import { Message } from './message.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private currentId = 0;
  private openedMessages: Message[] = [];
  get messages(): readonly Message[] {
    return this.openedMessages;
  }

  private addMessage(type: MessageType, text: string): void {
    const message: Message = {
      id: ++this.currentId,
      type,
      text,
    };
    this.openedMessages.unshift(message);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  public closeMessage(id: number): void {
    this.openedMessages = this.openedMessages.filter((message) => message.id !== id);
  }

  public showWarn(text: string): void {
    this.addMessage(MessageType.Warn, text);
  }

  public showError(text: string): void {
    this.addMessage(MessageType.Error, text);
  }

  public showSuccess(text: string): void {
    this.addMessage(MessageType.Success, text);
  }

  public showInfo(text: string): void {
    this.addMessage(MessageType.Info, text);
  }
}
