# @lai/core

Core AI library for provider, storage, context, privacy, and streaming abstractions.
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