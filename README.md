# n8n MCP Server

A Model Context Protocol (MCP) server that enables seamless management of n8n workflows directly within the Cursor editor.

## Features

- List available workflows from n8n
- View workflow details
- Execute workflows
- Monitor workflow executions
- Pass parameters to workflows

## Prerequisites

- Node.js (v14+)
- n8n instance with API access
- Cursor editor with MCP support

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/n8n-mcp-server.git
   cd n8n-mcp-server
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your n8n API details.

## Development

Start the development server:
```
npm run start:dev
```

Build the project:
```
npm run build
```

Run tests:
```
npm test
```

## Usage

1. Start the MCP server:
   ```
   npm start
   ```

2. Configure Cursor to use the MCP server:
   - Open Cursor settings
   - Navigate to the MCP section
   - Add the server URL (e.g., `http://localhost:3000`)

3. Use n8n workflow commands in Cursor:
   - "List workflows"
   - "Execute workflow [workflow name]"
   - "Get workflow status [execution ID]"

## API Documentation

See the [API Documentation](docs/api.md) for details on the available MCP functions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License. 