# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-11-05

### Added
- Initial release
- Multi-provider AI support (OpenAI, Anthropic, Gemini, Ollama)
- SQLite-based storage with FTS5 search
- Context building (files, git, workspace)
- Privacy controls and encryption
- Streaming support for all providers
- Comprehensive test suite
- TypeScript support with full type definitions

### Features
- `AIClient` - Main client for AI interactions
- `ProviderFactory` - Easy provider creation
- `ConversationStore` - Conversation CRUD operations
- `MessageStore` - Message storage and search
- `ContextBuilder` - Build rich context from various sources
- `ConversationEncryption` - Encrypt/decrypt conversations
- Streaming support via async generators

[Unreleased]: https://github.com/tbmobb813/lai-core/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/tbmobb813/lai-core/releases/tag/v0.1.0
