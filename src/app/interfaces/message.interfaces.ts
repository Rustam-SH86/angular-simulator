import { MessageType } from '../enums/message.enums';

export interface IMessage {
  id: number;
  type: MessageType;
  text: string;
}
