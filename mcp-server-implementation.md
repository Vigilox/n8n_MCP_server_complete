# MCP Server Implementation for n8n Workflow Management

## Overview

This document outlines the implementation details for creating an MCP server that connects Cursor to n8n for workflow management. The server will act as a bridge, translating MCP requests from Cursor into n8n API calls and formatting the responses back to Cursor.

## Architecture

The MCP server for n8n will follow this architecture:

```
┌─────────┐         ┌────────────┐         ┌─────────────┐
│         │  MCP    │            │  REST   │             │
│ Cursor  │◄───────►│ MCP Server │◄───────►│ n8n Instance│
│         │ Protocol│            │   API   │             │
└─────────┘         └────────────┘         └─────────────┘
```

## Technology Stack

- **Language**: Node.js
- **Framework**: Express.js
- **HTTP Client**: Axios for n8n API communication
- **Configuration**: dotenv for environment variables
- **Logging**: Winston for structured logging
- **Testing**: Jest for unit and integration tests

## Core Components

### 1. MCP Protocol Handler

Responsible for:
- Receiving and parsing MCP requests
- Validating request format and parameters
- Routing requests to appropriate handlers
- Formatting responses according to MCP specification

```javascript
// Example MCP protocol handler
const handleMCPRequest = async (req, res) => {
  try {
    const { id, method, params } = req.body;
    
    // Validate request
    if (!id || !method) {
      return res.status(400).json({
        id,
        result: null,
        error: { code: 400, message: "Invalid request format" }
      });
    }
    
    // Route to appropriate handler
    const handler = methodHandlers[method];
    if (!handler) {
      return res.status(404).json({
        id,
        result: null,
        error: { code: 404, message: `Method '${method}' not found` }
      });
    }
    
    // Execute handler
    const result = await handler(params);
    
    // Return response
    return res.json({
      id,
      result,
      error: null
    });
  } catch (error) {
    return res.status(500).json({
      id: req.body.id,
      result: null,
      error: { code: 500, message: error.message }
    });
  }
};
```

### 2. n8n API Client

Responsible for:
- Communicating with the n8n REST API
- Handling authentication
- Managing API requests and responses
- Error handling and retries

```javascript
// Example n8n API client
class N8nApiClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    });
  }
  
  async listWorkflows() {
    try {
      const response = await this.axios.get('/workflows');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to list workflows: ${error.message}`);
    }
  }
  
  async getWorkflow(id) {
    try {
      const response = await this.axios.get(`/workflows/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get workflow ${id}: ${error.message}`);
    }
  }
  
  async executeWorkflow(id, data = {}) {
    try {
      const response = await this.axios.post(`/workflows/${id}/execute`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to execute workflow ${id}: ${error.message}`);
    }
  }
  
  // Additional methods for other n8n API endpoints
}
```

### 3. Function Handlers

Responsible for:
- Implementing specific MCP functions
- Processing function parameters
- Calling the n8n API client
- Formatting results for MCP responses

```javascript
// Example function handlers
const methodHandlers = {
  // List all workflows
  'n8n_list_workflows': async (params = {}) => {
    const { filter } = params;
    const workflows = await n8nClient.listWorkflows();
    
    // Apply filtering if provided
    let filteredWorkflows = workflows.data;
    if (filter) {
      filteredWorkflows = filteredWorkflows.filter(wf => 
        wf.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    
    return {
      workflows: filteredWorkflows.map(wf => ({
        id: wf.id,
        name: wf.name,
        active: wf.active,
        createdAt: wf.createdAt,
        updatedAt: wf.updatedAt
      }))
    };
  },
  
  // Get workflow details
  'n8n_get_workflow': async (params) => {
    const { id } = params;
    if (!id) {
      throw new Error('Workflow ID is required');
    }
    
    const workflow = await n8nClient.getWorkflow(id);
    return { workflow };
  },
  
  // Execute a workflow
  'n8n_execute_workflow': async (params) => {
    const { id, data } = params;
    if (!id) {
      throw new Error('Workflow ID is required');
    }
    
    const execution = await n8nClient.executeWorkflow(id, data || {});
    return { 
      executionId: execution.id,
      status: execution.status
    };
  },
  
  // Additional function handlers for other operations
};
```

### 4. Configuration Management

Responsible for:
- Loading environment variables
- Managing server configuration
- Handling secrets securely

```javascript
// Example configuration management
require('dotenv').config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },
  n8n: {
    baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678/api',
    apiKey: process.env.N8N_API_KEY
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

// Validate required configuration
if (!config.n8n.apiKey) {
  console.error('N8N_API_KEY environment variable is required');
  process.exit(1);
}

module.exports = config;
```

### 5. Server Setup

Responsible for:
- Setting up the Express server
- Configuring middleware
- Defining routes
- Starting the server

```javascript
// Example server setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { handleMCPRequest } = require('./mcp-handler');
const config = require('./config');
const logger = require('./logger');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger.requestLogger);

// Routes
app.post('/mcp', handleMCPRequest);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(config.server.port, config.server.host, () => {
  console.log(`MCP Server running at http://${config.server.host}:${config.server.port}`);
});
```

## MCP Function Definitions

The MCP server will expose the following functions to Cursor:

### Workflow Management

1. **n8n_list_workflows**
   - Lists all available workflows
   - Parameters: `{ filter?: string }`
   - Returns: `{ workflows: Array<Workflow> }`

2. **n8n_get_workflow**
   - Gets details of a specific workflow
   - Parameters: `{ id: string }`
   - Returns: `{ workflow: Workflow }`

3. **n8n_execute_workflow**
   - Executes a workflow
   - Parameters: `{ id: string, data?: object }`
   - Returns: `{ executionId: string, status: string }`

### Execution Management

4. **n8n_list_executions**
   - Lists executions of a workflow
   - Parameters: `{ workflowId?: string, limit?: number }`
   - Returns: `{ executions: Array<Execution> }`

5. **n8n_get_execution**
   - Gets details of a specific execution
   - Parameters: `{ id: string }`
   - Returns: `{ execution: Execution }`

### Advanced Features (Optional)

6. **n8n_create_workflow**
   - Creates a new workflow
   - Parameters: `{ name: string, nodes: Array<Node>, connections: Array<Connection> }`
   - Returns: `{ workflow: Workflow }`

7. **n8n_update_workflow**
   - Updates an existing workflow
   - Parameters: `{ id: string, name?: string, active?: boolean, nodes?: Array<Node>, connections?: Array<Connection> }`
   - Returns: `{ workflow: Workflow }`

## Error Handling

The MCP server will implement comprehensive error handling:

1. **Input Validation**: Validate all input parameters before processing
2. **API Errors**: Handle and translate n8n API errors into MCP error responses
3. **Server Errors**: Catch and log server errors, returning appropriate error responses
4. **Retries**: Implement retry logic for transient errors

## Security Considerations

1. **Authentication**:
   - Secure the MCP server with API key authentication
   - Securely store and manage the n8n API key

2. **HTTPS**:
   - Use HTTPS for production deployments
   - Configure proper SSL certificates

3. **Input Sanitization**:
   - Sanitize all input to prevent injection attacks
   - Validate parameters against expected types and formats

## Deployment

The MCP server can be deployed in several ways:

1. **Local Development**:
   - Run directly with Node.js
   - Use nodemon for automatic reloading during development

2. **Production**:
   - Deploy as a standalone Node.js service
   - Use PM2 or similar for process management
   - Consider containerization with Docker

3. **Cloud Deployment**:
   - Deploy to cloud platforms like AWS, Azure, or Heroku
   - Set up proper environment variables for configuration

## Resources

- [n8n API Documentation](https://docs.n8n.io/api/)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [Express.js Documentation](https://expressjs.com/)
- [Cursor MCP Documentation](https://docs.cursor.com/advanced/model-context-protocol) 