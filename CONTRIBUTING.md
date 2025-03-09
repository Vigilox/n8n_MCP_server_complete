# Contributing to n8n MCP Server

Thank you for your interest in contributing to the n8n MCP Server project! This document provides guidelines and instructions for contributing.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dopehunter/n8n_MCP_server_complete.git
   cd n8n_MCP_server_complete
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   - Set up your n8n instance URL
   - Configure your n8n API key
   - Adjust other settings as needed

5. Start the development server:
   ```bash
   npm run start:dev
   ```

## Running Tests

We have several types of tests:

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Check test coverage
npm run test:coverage
```

## Code Style and Linting

We use ESLint and Prettier to maintain code quality:

```bash
# Run linter
npm run lint

# Format code
npm run format
```

## Build Process

To build the project:

```bash
npm run build
```

## Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Update the documentation if your changes require it.
3. Make sure your code lints and passes all tests.
4. Submit your pull request.

## Commit Guidelines

We follow conventional commit messages:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect code (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Updates to build process, tooling, etc.

## Testing Against a Local n8n Instance

To fully test the MCP server, you'll need a running n8n instance:

1. Install n8n locally:
   ```bash
   npm install -g n8n
   ```

2. Start n8n:
   ```bash
   n8n start
   ```

3. Generate an API key in the n8n UI (Settings → API).

4. Update your `.env` file with the API key.

## Need Help?

If you have questions or need help, please open an issue on GitHub. 