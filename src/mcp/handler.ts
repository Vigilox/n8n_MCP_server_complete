import { Request, Response } from 'express';
import { MCPRequest, MCPResponse, MethodHandlers } from '../types';
import { createMCPError } from '../utils/errors';
import logger from '../utils/logger';
import { validateMCPRequest } from './validation';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Load the smithery.yaml config
const loadSmitheryConfig = () => {
  try {
    const configPath = path.resolve(process.cwd(), 'smithery.yaml');
    const configFile = fs.readFileSync(configPath, 'utf8');
    return yaml.load(configFile) as any;
  } catch (error) {
    logger.error('Failed to load smithery.yaml config:', error);
    return {
      name: 'n8n_mcp_server',
      version: '0.1.0',
      description: 'An MCP server for managing n8n workflows through the Model Context Protocol',
      tools: []
    };
  }
};

const smitheryConfig = loadSmitheryConfig();

/**
 * Handles MCP protocol requests
 * @param methodHandlers Object mapping method names to handler functions
 * @returns Express request handler
 */
export const createMCPHandler = (methodHandlers: MethodHandlers) => {
  return async (req: Request, res: Response): Promise<void> => {
    let mcpRequest: MCPRequest;
    let mcpResponse: MCPResponse;

    try {
      // Parse and validate the request
      mcpRequest = req.body as MCPRequest;
      validateMCPRequest(mcpRequest);
      
      const { id, method, params } = mcpRequest;
      
      logger.info(`Processing MCP request: ${method}`, { id, method, params });
      
      // Handle special MCP method for tool discovery
      if (method === 'mcp.tools.list') {
        const tools = smitheryConfig.tools.map((tool: any) => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters
        }));
        
        mcpResponse = {
          jsonrpc: '2.0',
          id,
          result: { tools }
        };
        
        res.json(mcpResponse);
        return;
      }
      
      // Check if the method exists
      if (!methodHandlers[method]) {
        logger.warn(`Method not found: ${method}`);
        mcpResponse = {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Method '${method}' not found`,
          },
        };
        res.status(404).json(mcpResponse);
        return;
      }
      
      // Execute the method handler
      try {
        const result = await methodHandlers[method](params);
        
        // Return successful response
        mcpResponse = {
          jsonrpc: '2.0',
          id,
          result,
        };
        
        logger.info(`MCP request successful: ${method}`, { id, method });
        res.json(mcpResponse);
      } catch (error) {
        // Handle method execution error
        logger.error(`Error executing method ${method}:`, { error });
        
        mcpResponse = {
          jsonrpc: '2.0',
          id,
          error: createMCPError(error as Error),
        };
        
        // Use the error code for the HTTP status if available
        const statusCode = (error as any).code ? 500 : 200; // Always return 200 for JSONRPC errors
        res.status(statusCode).json(mcpResponse);
      }
    } catch (error) {
      // Handle request parsing/validation error
      logger.error('Error processing MCP request:', { error });
      
      mcpResponse = {
        jsonrpc: '2.0',
        id: (req.body as MCPRequest)?.id || null,
        error: createMCPError(error as Error),
      };
      
      res.status(200).json(mcpResponse); // Always return 200 for JSONRPC errors
    }
  };
}; 