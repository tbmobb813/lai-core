# Contributing to @lai/core

First off, thank you for considering contributing to @lai/core! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by a code of respect and professionalism. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include code samples** and error messages
- **Specify your environment** (OS, Node version, package version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternatives** you've considered

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following the coding standards below
3. **Add tests** for any new functionality
4. **Ensure all tests pass** (`pnpm test`)
5. **Ensure linting passes** (`pnpm lint`)
6. **Update documentation** if needed
7. **Write a good commit message**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/lai-core.git
cd lai-core

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build
pnpm build

# Lint
pnpm lint
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Maintain type safety - avoid `any` when possible
- Export types for public APIs
- Use interfaces for object shapes

### Code Style

- Run `pnpm format` before committing
- Follow existing code patterns
- Keep functions small and focused
- Write self-documenting code with clear names

### Testing

- Write tests for all new features
- Maintain test coverage above 80%
- Use descriptive test names
- Group related tests using `describe`

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add support for new provider
fix: resolve streaming timeout issue
docs: update README with examples
test: add tests for encryption
chore: update dependencies
```

## Project Structure

```
lai-core/
├── core/
│   ├── src/
│   │   ├── providers/     # AI provider implementations
│   │   ├── storage/       # Database and storage
│   │   ├── context/       # Context building
│   │   ├── privacy/       # Encryption and privacy
│   │   ├── streaming/     # Streaming utilities
│   │   ├── client.ts      # Main client
│   │   ├── types.ts       # Type definitions
│   │   └── index.ts       # Public exports
│   └── __tests__/         # Test files
├── .github/               # GitHub Actions
└── package.json
```

## Adding a New Provider

1. Create a new file in `core/src/providers/`
2. Implement the `Provider` interface
3. Add to `ProviderFactory` in `providers/index.ts`
4. Add tests in `core/src/__tests__/providers/`
5. Update README with examples
6. Update types if needed

## Questions?

Feel free to open an issue with the label `question` or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
