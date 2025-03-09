# Troubleshooting Guide

This document provides solutions for common issues encountered when using the n8n MCP Server.

## Connection Issues

### Connection Refused Errors

**Symptom**: Error messages like `ECONNREFUSED` when the server tries to connect to n8n.

**Possible causes and solutions**:

1. **n8n is not running**
   - Ensure your n8n instance is running
   - Check if you can access the n8n UI in your browser (typically at http://localhost:5678)
   - Start n8n if it's not running: `n8n start`

2. **Incorrect n8n URL**
   - Verify the `N8N_BASE_URL` in your `.env` file
   - Make sure it includes the `/api` suffix: `http://localhost:5678/api`
   - Try pinging the URL: `curl http://localhost:5678/api/version`

3. **Firewall or network issues**
   - Check if any firewall is blocking connections
   - If n8n is running on a different machine, ensure network connectivity

### API Key Issues

**Symptom**: Authentication errors when connecting to n8n.

**Solutions**:

1. Generate a new API key in the n8n UI:
   - Go to Settings → API
   - Create a new API key with appropriate permissions
   - Copy the key to your `.env` file

2. Ensure the API key is properly formatted in your `.env` file:
   ```
   N8N_API_KEY=your_actual_key_here
   ```

3. Restart the MCP server after changing the API key

## Docker Issues

### Docker Daemon Not Running

**Symptom**: Error message "Cannot connect to the Docker daemon"

**Solutions**:

1. Start Docker Desktop (on Mac/Windows) or the Docker service (on Linux):
   ```bash
   # On Linux
   sudo systemctl start docker
   ```

2. Check if Docker is running:
   ```bash
   docker info
   ```

### Image Build Failures

**Symptom**: Errors during `docker build`

**Solutions**:

1. Check for syntax errors in your Dockerfile
2. Ensure you have sufficient disk space
3. Verify internet connectivity for pulling base images

## MCP Protocol Issues

### Invalid JSON-RPC Requests

**Symptom**: Errors like "Invalid request" or "Method not found"

**Solutions**:

1. Verify your JSON-RPC request format:
   ```json
   {
     "jsonrpc": "2.0",
     "id": "1",
     "method": "method_name",
     "params": {}
   }
   ```

2. Check that you're using a supported method:
   - Use `mcp.tools.list` to see available methods
   - Refer to the API documentation for proper method names

## Logging and Debugging

To increase log verbosity:

1. Set `LOG_LEVEL=debug` in your `.env` file
2. Restart the server
3. Check the logs for detailed information

## Still Having Issues?

Please open an issue on our GitHub repository (https://github.com/dopehunter/n8n_MCP_server_complete) with:

1. A detailed description of the problem
2. Steps to reproduce
3. Relevant error messages
4. Your environment information (OS, Node.js version, etc.) 