# MCP Server for n8n Workflow Management in Cursor

## Project Overview

This project aims to develop a Multi-Cursor Protocol (MCP) server that enables seamless management of n8n workflows directly within the Cursor editor. By bridging Cursor and n8n through MCP, developers can interact with their automation workflows without leaving their coding environment, significantly improving productivity and workflow.

## Problem Statement

Currently, developers using n8n for workflow automation alongside Cursor for coding must constantly switch between:
- The Cursor editor for writing code
- The n8n web interface for creating, managing, and monitoring workflows

This context switching disrupts the development flow and reduces productivity. An integrated solution would allow developers to manage their n8n workflows directly from within Cursor.

## Solution: MCP Server for n8n

The Multi-Cursor Protocol (MCP) provides a standardized way for code editors to communicate with external services. By implementing an MCP server that interfaces with n8n's API, we can extend Cursor's functionality to include n8n workflow management.

### Core Functionality

The MCP server will act as a bridge between Cursor and n8n, translating MCP requests from Cursor into n8n API calls and formatting the responses back to Cursor.

### Key Features

1. **Workflow Discovery**
   - List available workflows from n8n
   - View workflow details (name, description, status)
   - Search and filter workflows

2. **Workflow Execution**
   - Trigger workflow execution directly from Cursor
   - Pass input parameters to workflows
   - Handle execution options (e.g., with or without data)

3. **Workflow Status Monitoring**
   - Check execution status of workflows
   - View basic execution results
   - Monitor active workflow runs

4. **Workflow Logs (Optional)**
   - Access execution logs for debugging
   - View error messages and execution details

5. **Workflow Creation/Modification (Stretch Goal)**
   - Basic workflow creation capabilities
   - Simple workflow modifications

## Technical Architecture

### Components

1. **Cursor Editor (Client)**
   - Initiates requests to the MCP server
   - Displays workflow information and status
   - Provides UI for workflow management

2. **MCP Server (Middle Tier)**
   - Receives and processes MCP requests from Cursor
   - Communicates with n8n API
   - Transforms data between MCP and n8n formats
   - Handles authentication and error management

3. **n8n Instance (Backend)**
   - Existing n8n installation where workflows are defined and executed
   - Exposes REST API for workflow management

### Communication Flow

```
┌─────────┐         ┌────────────┐         ┌─────────────┐
│         │  MCP    │            │  REST   │             │
│ Cursor  │◄───────►│ MCP Server │◄───────►│ n8n Instance│
│         │ Protocol│            │   API   │             │
└─────────┘         └────────────┘         └─────────────┘
```

1. User initiates an n8n action in Cursor
2. Cursor sends an MCP request to the MCP server
3. MCP server translates the request into an n8n API call
4. n8n processes the request and returns a response
5. MCP server formats the response into MCP format
6. Cursor displays the information to the user

## Technology Stack

### MCP Server

- **Language**: Node.js (preferred due to JavaScript ecosystem and async capabilities)
- **Framework**: Express.js for HTTP server and routing
- **n8n Integration**: Direct HTTP requests to n8n REST API using Axios
- **Authentication**: Support for API keys and potentially OAuth for n8n access
- **Data Handling**: JSON for data exchange

### Dependencies

- Node.js (v14+)
- Express.js
- Axios for HTTP requests
- dotenv for configuration
- Winston for logging

### Development Tools

- ESLint for code quality
- Jest for testing
- Nodemon for development
- Docker for containerization (optional)

## Development Roadmap

### Phase 1: Foundation

1. **Project Setup**
   - Initialize Node.js project
   - Set up Express server
   - Configure basic MCP endpoint structure
   - Implement configuration management

2. **n8n API Integration (Basic)**
   - Implement n8n API client
   - Add authentication handling
   - Test basic API connectivity

3. **MCP Protocol Implementation (Basic)**
   - Implement core MCP request/response handling
   - Define data models for MCP communication
   - Set up error handling

### Phase 2: Core Features

4. **Workflow Listing**
   - Implement "List Workflows" functionality
   - Add filtering and search capabilities
   - Format workflow data for Cursor display

5. **Workflow Execution**
   - Implement "Execute Workflow" functionality
   - Add parameter passing support
   - Handle execution options

6. **Workflow Status**
   - Implement status checking for workflows
   - Add execution result retrieval
   - Implement basic monitoring capabilities

### Phase 3: Enhancement and Refinement

7. **Error Handling and Robustness**
   - Improve error handling throughout the application
   - Add retry mechanisms for API failures
   - Implement proper logging

8. **Security Enhancements**
   - Review and enhance authentication mechanisms
   - Implement rate limiting
   - Add input validation

9. **Testing and Documentation**
   - Write comprehensive tests
   - Create user documentation
   - Document API endpoints and usage

### Phase 4: Advanced Features (Optional)

10. **Workflow Logs**
    - Implement log retrieval from n8n
    - Add log filtering and search
    - Format logs for display in Cursor

11. **Workflow Creation/Modification**
    - Implement basic workflow creation
    - Add simple modification capabilities
    - Support for workflow templates

## Deployment Considerations

- **Local Development**: Run as a local service during development
- **Production Options**:
  - Standalone Node.js service
  - Docker container
  - Cloud deployment (AWS, Azure, etc.)
- **Configuration Management**: Use environment variables for configuration
- **Monitoring**: Implement health checks and basic monitoring

## Security Considerations

- **Authentication**: Secure both Cursor-to-MCP and MCP-to-n8n communication
- **API Keys**: Safely store and manage n8n API keys
- **Data Handling**: Properly handle sensitive workflow data
- **Input Validation**: Validate all inputs to prevent injection attacks

## Success Metrics

- **Functionality**: All core features working reliably
- **Performance**: Response times under 500ms for most operations
- **Usability**: Positive feedback from Cursor users
- **Stability**: 99.9% uptime for the MCP server
- **Adoption**: Number of active users managing n8n workflows through Cursor

## Future Possibilities

- **Workflow Templates**: Support for creating workflows from templates
- **Workflow Visualization**: Basic visualization of workflow structure
- **Execution History**: Detailed history of workflow executions
- **Notifications**: Alerts for workflow failures or completions
- **Multi-Environment Support**: Manage workflows across different n8n environments

## Resources

- [n8n API Documentation](https://docs.n8n.io/api/)
- [Multi-Cursor Protocol Documentation](https://cursor.sh/docs/mcp) (placeholder)
- [Express.js Documentation](https://expressjs.com/) 