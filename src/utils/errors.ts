import { MCPError } from '../types';
import logger from './logger';

// Add type declaration for Error.captureStackTrace
declare global {
  interface ErrorConstructor {
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
  }
}

// JSON-RPC error codes - https://www.jsonrpc.org/specification#error_object
export enum ErrorCode {
  // Standard JSON-RPC error codes
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603,
  
  // Custom error codes (must be between -32000 and -32099)
  UNAUTHORIZED = -32001,
  FORBIDDEN = -32002,
  N8N_API_ERROR = -32003,
  VALIDATION_ERROR = -32004,

  // HTTP status codes (used internally only, not for JSON-RPC)
  HTTP_BAD_REQUEST = 400,
  HTTP_UNAUTHORIZED = 401,
  HTTP_FORBIDDEN = 403,
  HTTP_NOT_FOUND = 404,
  HTTP_INTERNAL_SERVER_ERROR = 500,
}

// Custom application error class
export class AppError extends Error {
  readonly code: number;
  readonly data?: any;

  constructor(message: string, code: number = ErrorCode.INTERNAL_ERROR, data?: any) {
    super(message);
    this.code = code;
    this.data = data;
    this.name = this.constructor.name;
    // Only use captureStackTrace if it exists (it's a V8 specific function)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Create an MCP error object from an AppError or any other error
export const createMCPError = (error: Error): MCPError => {
  // If it's an AppError, use its code, otherwise use internal error
  const isAppError = error instanceof AppError;
  const code = isAppError ? error.code : ErrorCode.INTERNAL_ERROR;
  const data = isAppError ? (error as AppError).data : undefined;
  
  // Log the error
  logger.error(`Error: ${error.message}`, {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code,
      data,
    },
  });

  return {
    code,
    message: error.message,
    data
  };
};

// Create specific error types
export const createBadRequestError = (message: string, data?: any): AppError => {
  return new AppError(message, ErrorCode.INVALID_PARAMS, data);
};

export const createUnauthorizedError = (message: string, data?: any): AppError => {
  return new AppError(message, ErrorCode.UNAUTHORIZED, data);
};

export const createForbiddenError = (message: string, data?: any): AppError => {
  return new AppError(message, ErrorCode.FORBIDDEN, data);
};

export const createNotFoundError = (message: string, data?: any): AppError => {
  return new AppError(message, ErrorCode.METHOD_NOT_FOUND, data);
};

export const createInternalServerError = (message: string, data?: any): AppError => {
  return new AppError(message, ErrorCode.INTERNAL_ERROR, data);
}; 