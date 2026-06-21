import { MessageType } from './message.enums';

export interface Message {
  id: number;
  type: MessageType;
  text: string;
}
