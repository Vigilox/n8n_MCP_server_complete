# Cursor MCP Integration Guide

## Overview

Cursor is an AI-powered code editor that supports the Model Context Protocol (MCP), allowing it to interact with external services and tools through MCP servers. This document outlines how to integrate MCP servers with Cursor and how to use MCP functionality within the editor.

## Cursor as an MCP Client

Cursor functions as an MCP client, capable of:

1. Connecting to multiple MCP servers
2. Sending requests to MCP servers
3. Receiving and processing responses
4. Displaying results within the editor interface

## Configuring MCP in Cursor

### Accessing MCP Settings

1. Open Cursor
2. Go to Settings (gear icon)
3. Navigate to the "AI" section
4. Find the "Model Context Protocol (MCP)" subsection

### Adding an MCP Server

To add a new MCP server to Cursor:

1. In the MCP settings, click "Add Server"
2. Enter the server URL (e.g., `http://localhost:3000`)
3. Provide any required authentication details
4. Save the configuration

### Testing MCP Connection

After adding an MCP server, you can test the connection:

1. In the MCP settings, click "Test Connection" next to your server
2. Cursor will attempt to connect to the server and report success or failure

## Using MCP in Cursor

### Accessing MCP Tools

MCP tools are accessible through Cursor's AI features:

1. Open the AI panel (usually with `Cmd+K` or `Ctrl+K`)
2. MCP tools will appear in the available tools list
3. Select a tool to use it

### Example: Using an MCP Tool

To use an MCP tool for n8n workflow management:

1. Open the AI panel
2. Select the n8n workflow tool
3. Enter your query (e.g., "List all workflows")
4. View the results in the AI panel

### Custom Commands

You can create custom commands that utilize MCP functionality:

1. Go to Settings > Commands
2. Click "Add Command"
3. Configure the command to use MCP tools
4. Assign a keyboard shortcut if desired

## Developing MCP Servers for Cursor

### Server Requirements

For an MCP server to work with Cursor, it must:

1. Implement the MCP protocol specification
2. Expose functions through the standard MCP format
3. Handle authentication if required
4. Return responses in the expected format

### Function Naming Conventions

When developing MCP functions for Cursor, follow these naming conventions:

- Use clear, descriptive names
- Prefix functions with the service name (e.g., `n8n_list_workflows`)
- Use snake_case for function names

### Response Formatting

Format responses to be easily displayed in Cursor:

- Use structured JSON for complex data
- Include human-readable messages
- Provide error details when applicable

## Troubleshooting

### Common Issues

1. **Connection Failed**: Verify the server URL and ensure the server is running
2. **Authentication Error**: Check your authentication credentials
3. **Function Not Found**: Ensure the function name matches what the server expects
4. **Timeout**: The server may be taking too long to respond

### Debugging

To debug MCP issues in Cursor:

1. Enable debug logging in Cursor settings
2. Check the developer console (View > Developer > Toggle Developer Tools)
3. Look for MCP-related log messages

## Best Practices

- **Security**: Use HTTPS for production MCP servers
- **Performance**: Optimize server responses for speed
- **Error Handling**: Provide clear error messages
- **Documentation**: Document all available functions
- **Versioning**: Include version information in your MCP server

## Resources

- [Cursor Documentation](https://docs.cursor.com)
- [Cursor MCP Documentation](https://docs.cursor.com/advanced/model-context-protocol)
- [Cursor Community Forum](https://forum.cursor.com)
- [MCP Support Documentation](https://forum.cursor.com/t/mcp-support-documentation/46482) 