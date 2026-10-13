import { MessageType } from './message-type.enum';

export interface IMessage {
  id: number;
  type: MessageType;
  text: string;
}
