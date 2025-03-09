import { Request, Response } from 'express';
import { MCPRequest, MCPResponse, MethodHandlers } from '../types';
import { createMCPError } from '../utils/errors';
import logger from '../utils/logger';
import { validateMCPRequest } from './validation';

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
      
      // Check if the method exists
      if (!methodHandlers[method]) {
        logger.warn(`Method not found: ${method}`);
        mcpResponse = {
          id,
          result: null,
          error: {
            code: 404,
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
          id,
          result,
          error: null,
        };
        
        logger.info(`MCP request successful: ${method}`, { id, method });
        res.json(mcpResponse);
      } catch (error) {
        // Handle method execution error
        logger.error(`Error executing method ${method}:`, { error });
        
        mcpResponse = {
          id,
          result: null,
          error: createMCPError(error as Error),
        };
        
        // Use the error code for the HTTP status if available
        const statusCode = (error as any).code || 500;
        res.status(statusCode).json(mcpResponse);
      }
    } catch (error) {
      // Handle request parsing/validation error
      logger.error('Error processing MCP request:', { error });
      
      mcpResponse = {
        id: (req.body as MCPRequest)?.id || 'unknown',
        result: null,
        error: createMCPError(error as Error),
      };
      
      res.status(400).json(mcpResponse);
    }
  };
}; 