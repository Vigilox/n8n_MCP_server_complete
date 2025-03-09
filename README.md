# n8n MCP Server

A Model Context Protocol (MCP) server that enables seamless management of n8n workflows directly within LLMs and AI agents through the Smithery Model Context Protocol.

![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-brightgreen.svg)

## Features

- List available workflows from n8n
- View workflow details
- Execute workflows
- Monitor workflow executions
- Pass parameters to workflows
- MCP-compatible interface for AI agents

## Components

### Tools

* **n8n_list_workflows**  
   * List all workflows in the n8n instance  
   * Input: None

* **n8n_get_workflow**  
   * Get details of a specific workflow  
   * Input: `workflowId` (string, required): ID of the workflow to retrieve

* **n8n_execute_workflow**  
   * Execute an n8n workflow  
   * Inputs:  
     * `workflowId` (string, required): ID of the workflow to execute  
     * `data` (object, optional): Data to pass to the workflow

* **n8n_get_executions**  
   * Get execution history for a workflow  
   * Inputs:  
     * `workflowId` (string, required): ID of the workflow to get executions for  
     * `limit` (number, optional): Maximum number of executions to return

* **n8n_activate_workflow**  
   * Activate a workflow  
   * Input: `workflowId` (string, required): ID of the workflow to activate

* **n8n_deactivate_workflow**  
   * Deactivate a workflow  
   * Input: `workflowId` (string, required): ID of the workflow to deactivate

## Prerequisites

- Node.js (v14+)
- n8n instance with API access
- An LLM or AI agent that supports the Model Context Protocol

## Configuration Options

### Docker Configuration

```json
{
  "mcpServers": {
    "n8n": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "-e", "N8N_API_KEY=$N8N_API_KEY", "-e", "N8N_BASE_URL=$N8N_BASE_URL", "mcp/n8n-mcp-server"]
    }
  }
}
```

### NPX Configuration

```json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": ["-y", "@dopehunter/n8n-mcp-server"]
    }
  }
}
```

## Installation

1. Clone the repository
   ```
   git clone https://github.com/dopehunter/n8n_MCP_server_complete.git
   cd n8n_MCP_server_complete
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

## Usage With Claude or Other LLMs

1. Start the MCP server:
   ```
   npm start
   ```

2. Configure your LLM client to use the MCP server:
   - For Claude Desktop, use the configuration from the "Configuration Options" section.
   - For other clients, point to the server URL (e.g., `http://localhost:3000/mcp`).

3. Your LLM can now use n8n workflows directly through MCP commands.

## Building Docker Image

```bash
docker build -t mcp/n8n-mcp-server .
```

## API Documentation

See the [API Documentation](docs/api.md) for details on the available MCP functions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License. 