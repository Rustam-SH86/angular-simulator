import { MessageType } from '../enums/message.enums'

export interface Message {
  id: number;
  type: MessageType;
  text: string;
}
