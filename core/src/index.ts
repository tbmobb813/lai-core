// @lai/core/src/index.ts

// Main client
export { AIClient } from './client';

// Storage
export { ConversationStore, MessageStore, SettingsStore } from './storage';

// Context building
export { ContextBuilder, FileContext, GitContext, WorkspaceContext } from './context';

// Privacy controls
export { PrivacyController, AuditLogger } from './privacy';

// Provider types
export { Provider, ProviderType, ProviderConfig } from './providers';

// Types
export type {
  Conversation,
  Message,
  CompletionOptions,
  StreamOptions,
  AIContext,
  PrivacySettings,
} from './types';