import { MCPRequest } from '../types';
import { createBadRequestError } from '../utils/errors';

/**
 * Validates an MCP request
 * @param request The MCP request to validate
 * @throws Error if validation fails
 */
export const validateMCPRequest = (request: MCPRequest): void => {
  // Check if request is an object
  if (!request || typeof request !== 'object') {
    throw createBadRequestError('Invalid request format: Request must be an object');
  }

  // Check required fields
  if (!request.id) {
    throw createBadRequestError('Invalid request format: Missing required field "id"');
  }

  if (typeof request.id !== 'string') {
    throw createBadRequestError('Invalid request format: Field "id" must be a string');
  }

  if (!request.method) {
    throw createBadRequestError('Invalid request format: Missing required field "method"');
  }

  if (typeof request.method !== 'string') {
    throw createBadRequestError('Invalid request format: Field "method" must be a string');
  }

  // Check params if present
  if (request.params !== undefined && (typeof request.params !== 'object' || request.params === null)) {
    throw createBadRequestError('Invalid request format: Field "params" must be an object');
  }
}; 