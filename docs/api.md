# MCP Server API Documentation

This document outlines the MCP functions exposed by the n8n MCP server.

## MCP Function Definitions

The MCP server exposes the following functions to Cursor:

### Workflow Management

#### `n8n_list_workflows`

Lists all available workflows from n8n.

**Parameters:**
```json
{
  "filter": "optional filter string"
}
```

**Returns:**
```json
{
  "workflows": [
    {
      "id": "1",
      "name": "My Workflow",
      "active": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z"
    }
  ]
}
```

#### `n8n_get_workflow`

Gets detailed information about a specific workflow.

**Parameters:**
```json
{
  "id": "workflow ID"
}
```

**Returns:**
```json
{
  "workflow": {
    "id": "1",
    "name": "My Workflow",
    "active": true,
    "nodes": [...],
    "connections": [...],
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
}
```

#### `n8n_execute_workflow`

Executes a workflow with optional input data.

**Parameters:**
```json
{
  "id": "workflow ID",
  "data": {
    "param1": "value1",
    "param2": "value2"
  }
}
```

**Returns:**
```json
{
  "executionId": "123",
  "status": "running"
}
```

### Execution Management

#### `n8n_list_executions`

Lists executions of a workflow.

**Parameters:**
```json
{
  "workflowId": "optional workflow ID",
  "limit": 10
}
```

**Returns:**
```json
{
  "executions": [
    {
      "id": "123",
      "workflowId": "1",
      "status": "success",
      "startedAt": "2023-01-03T10:00:00.000Z",
      "finishedAt": "2023-01-03T10:01:00.000Z"
    }
  ]
}
```

#### `n8n_get_execution`

Gets detailed information about a specific execution.

**Parameters:**
```json
{
  "id": "execution ID"
}
```

**Returns:**
```json
{
  "execution": {
    "id": "123",
    "workflowId": "1",
    "status": "success",
    "data": {...},
    "startedAt": "2023-01-03T10:00:00.000Z",
    "finishedAt": "2023-01-03T10:01:00.000Z",
    "nodeExecutionStatus": {...}
  }
}
```

## Error Handling

All functions return errors in the following format:

```json
{
  "error": {
    "code": 404,
    "message": "Resource not found"
  }
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 404: Resource Not Found
- 500: Internal Server Error 