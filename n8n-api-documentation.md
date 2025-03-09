# n8n API Documentation

## Overview

n8n provides a REST API that allows programmatic access to workflows, executions, and other n8n resources. This document summarizes the key API endpoints and functionality needed for our MCP server implementation.

## Base URL

The base URL for the n8n API depends on your n8n installation. For a local installation, it's typically:

```
http://localhost:5678/api/
```

For cloud or custom installations, replace with the appropriate host and port.

## Authentication

n8n API requires authentication. There are two primary methods:

### API Key

Add an `X-N8N-API-KEY` header to your requests with the API key value.

```
X-N8N-API-KEY: your_api_key_here
```

The API key can be set in the n8n configuration or via environment variables.

### Cookie Authentication

For browser-based applications, cookie authentication is also supported after logging in through the n8n interface.

## Key Endpoints

### Workflows

#### List Workflows

```
GET /workflows
```

Returns a list of all workflows.

#### Get Workflow

```
GET /workflows/{id}
```

Returns details of a specific workflow.

#### Create Workflow

```
POST /workflows
```

Creates a new workflow.

#### Update Workflow

```
PUT /workflows/{id}
```

Updates an existing workflow.

#### Delete Workflow

```
DELETE /workflows/{id}
```

Deletes a workflow.

#### Execute Workflow

```
POST /workflows/{id}/execute
```

Executes a workflow. This endpoint is not part of the public API but can be used internally.

Alternative method:

```
POST /rest/workflows/run
```

This is a private endpoint used by the n8n interface.

### Executions

#### List Executions

```
GET /executions
```

Returns a list of workflow executions.

#### Get Execution

```
GET /executions/{id}
```

Returns details of a specific execution.

#### Delete Execution

```
DELETE /executions/{id}
```

Deletes an execution.

### Credentials

#### List Credentials

```
GET /credentials
```

Returns a list of credentials.

#### Get Credential

```
GET /credentials/{id}
```

Returns details of a specific credential.

## Request and Response Format

All API requests and responses use JSON format.

### Example: List Workflows Response

```json
{
  "data": [
    {
      "id": "1",
      "name": "My Workflow",
      "active": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z",
      "nodes": [...],
      "connections": [...]
    },
    ...
  ],
  "nextCursor": null
}
```

### Example: Execute Workflow Request

```json
{
  "workflowData": {
    "id": "1"
  },
  "runData": {
    "startNodes": ["Start Node ID"],
    "destinationNode": "End Node ID",
    "executionMode": "manual"
  }
}
```

## Error Handling

The API returns standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses include a JSON body with error details:

```json
{
  "code": 404,
  "message": "Workflow not found"
}
```

## Rate Limiting

The n8n API may implement rate limiting depending on the installation. Check your specific n8n instance configuration for details.

## Webhooks

n8n workflows can expose webhook endpoints that can be triggered via HTTP requests. These are separate from the API but can be useful for integration.

## Resources

- [Official n8n API Documentation](https://docs.n8n.io/api/)
- [API Reference](https://docs.n8n.io/api/api-reference/)
- [n8n Community Forum](https://community.n8n.io/) 