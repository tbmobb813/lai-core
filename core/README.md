# @lai/core

Core AI library providing multi-provider AI capabilities with privacy controls, local-first architecture, and comprehensive context management.

## Features

- 🤖 **Multi-Provider Support**: OpenAI, Anthropic, Google Gemini, and local Ollama
- 🔒 **Privacy-First**: Built-in encryption and local-first routing
- 💾 **Persistent Storage**: SQLite-based conversation and message storage with FTS5 search
- 🌊 **Streaming Support**: Real-time streaming responses from all providers
- 🔍 **Context Management**: File, Git, and workspace-aware context building
- 📦 **TypeScript**: Full type safety and IntelliSense support

## Installation

```bash
npm install @lai/core
# or
pnpm add @lai/core
# or
yarn add @lai/core
```

## Quick Start

### Basic Usage

```typescript
import { AIClient } from '@lai/core';

// Initialize the client
const client = new AIClient({
  provider: {
    type: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4',
  },
  storage: {
    path: './data/ai.db',
  },
});

// Create a conversation
const conversationId = await client.createConversation({
  title: 'My First Chat',
});

// Send a message
const response = await client.sendMessage({
  conversationId,
  content: 'Hello! How can AI help me today?',
});

console.log(response.content);
```

### Streaming Responses

```typescript
const stream = await client.streamMessage({
  conversationId,
  content: 'Tell me a story',
});

for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

### Using Different Providers

```typescript
import { ProviderFactory } from '@lai/core';

// OpenAI
const openai = ProviderFactory.create({
  type: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4-turbo',
});

// Anthropic Claude
const claude = ProviderFactory.create({
  type: 'anthropic',
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-3-5-sonnet-20241022',
});

// Google Gemini
const gemini = ProviderFactory.create({
  type: 'gemini',
  apiKey: process.env.GEMINI_API_KEY,
  model: 'gemini-pro',
});

// Local Ollama
const ollama = ProviderFactory.create({
  type: 'ollama',
  baseUrl: 'http://localhost:11434',
  model: 'llama2',
});
```

## Storage & Search

```typescript
import { ConversationStore, MessageStore } from '@lai/core';

const conversations = new ConversationStore('./data/ai.db');
const messages = new MessageStore('./data/ai.db');

// Create a conversation
const id = await conversations.create({
  title: 'Project Discussion',
  provider: 'openai',
  model: 'gpt-4',
});

// Add messages
await messages.create({
  conversationId: id,
  role: 'user',
  content: 'What is TypeScript?',
  timestamp: Date.now(),
});

// Full-text search
const results = await conversations.search('typescript');
const messageResults = await messages.search('function', id);
```

## Context Building

```typescript
import { ContextBuilder } from '@lai/core';

const builder = new ContextBuilder();

// Add files from your project
builder.addFiles([
  './src/index.ts',
  './src/utils.ts',
]);

// Add Git context
builder.addGitContext('./');

// Add workspace info
builder.addWorkspace('./');

// Build the context
const context = await builder.build();
```

## Encryption & Privacy

```typescript
import { encryptConversation, decryptConversation } from '@lai/core';

const conversation = {
  messages: [
    { role: 'user', content: 'Sensitive information' },
    { role: 'assistant', content: 'Private response' },
  ],
};

// Encrypt
const encrypted = await encryptConversation(
  conversation,
  'your-encryption-key'
);

// Decrypt
const decrypted = await decryptConversation(
  encrypted,
  'your-encryption-key'
);
```

## Configuration

Create a `.env` file:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
OLLAMA_BASE_URL=http://localhost:11434
```

## API Reference

### AIClient

Main client for interacting with AI providers.

#### Methods

- `createConversation(options)` - Create a new conversation
- `sendMessage(options)` - Send a message and get response
- `streamMessage(options)` - Stream a response
- `getConversation(id)` - Retrieve conversation by ID
- `searchConversations(query)` - Full-text search conversations

### Providers

- `OpenAIProvider` - GPT-3.5, GPT-4, GPT-4 Turbo
- `AnthropicProvider` - Claude 3 family
- `GeminiProvider` - Google Gemini models
- `OllamaProvider` - Local models via Ollama

### Storage

- `ConversationStore` - CRUD operations for conversations
- `MessageStore` - Message storage and retrieval
- `SettingsStore` - Application settings

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Test
pnpm test

# Test with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch

# Lint
pnpm lint

# Fix lint issues
pnpm lint:fix
```

## License

MIT © tbmobb813

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/tbmobb813/lai-core).
# @lai/core

Core AI engine for LAI and UDP with multi-provider support.

## Installation

\`\`\`bash
npm install @lai/core
\`\`\`

## Quick Start

\`\`\`typescript
import { AIClient } from '@lai/core';

const client = new AIClient({
  provider: {
    type: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4',
  },
});

const response = await client.ask('Hello!');
console.log(response);
\`\`\`

## Features

- Multi-provider support (OpenAI, Anthropic, Gemini, Ollama)
- Conversation storage with SQLite
- Privacy controls and audit logging
- Context-aware completions
- Streaming responses

## License

MIT