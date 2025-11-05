// @lai/core/src/types.ts

export interface CompletionOptions {
  prompt: string;
  context?: AIContext;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface AIContext {
  files?: FileContext[];
  gitDiff?: string;
  gitLog?: string;
  projectStructure?: ProjectStructure;
  recentChanges?: FileChange[];
  workspace?: WorkspaceInfo;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  provider: ProviderType;
  model: string;
  messages: Message[];
  metadata?: Record<string, any>;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  tokensUsed?: number;
  context?: AIContext;
}

export interface ProviderConfig {
  type: ProviderType;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  timeout?: number;
}

export type ProviderType = 'openai' | 'anthropic' | 'gemini' | 'ollama';

export interface PrivacySettings {
  localFirst: boolean;
  auditEnabled: boolean;
  encryptConversations: boolean;
  dataRetentionDays?: number;
  neverSendPatterns?: string[]; // Regex patterns for sensitive data
}