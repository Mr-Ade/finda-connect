import { User } from './auth';
import { Business } from './business';

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type MessageType = 'text' | 'file' | 'voice' | 'image';
export type MessageReaction = '👍' | '❤️' | '😄' | '😢' | '😮' | '🎉';

export interface Attachment {
  id: string;
  url: string;
  type: 'file' | 'image' | 'voice';
  name: string;
  size: number;
  duration?: number; // For voice messages
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  type: MessageType;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
  attachment?: Attachment;
  reactions: MessageReactionData[];
}

export interface MessageReactionData {
  id: string;
  messageId: string;
  userId: string;
  reaction: MessageReaction;
  createdAt: string;
}

export interface Conversation {
  id: string;
  businessId: string;
  business: Business;
  userId: string;
  user: User;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  isOnline?: boolean;
}

export interface VoiceRecorderState {
  isRecording: boolean;
  duration: number;
  audioBlob?: Blob;
}