import { MCPError } from '../types';
import logger from './logger';

// Add type declaration for Error.captureStackTrace
declare global {
  interface ErrorConstructor {
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
  }
}

// Standard HTTP error codes
export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// Custom application error class
export class AppError extends Error {
  readonly code: number;

  constructor(message: string, code: number = ErrorCode.INTERNAL_SERVER_ERROR) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    // Only use captureStackTrace if it exists (it's a V8 specific function)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Create an MCP error object from an AppError or any other error
export const createMCPError = (error: Error): MCPError => {
  // If it's an AppError, use its code, otherwise use 500
  const code = error instanceof AppError ? error.code : ErrorCode.INTERNAL_SERVER_ERROR;
  
  // Log the error
  logger.error(`Error: ${error.message}`, {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code,
    },
  });

  return {
    code,
    message: error.message,
  };
};

// Create specific error types
export const createBadRequestError = (message: string): AppError => {
  return new AppError(message, ErrorCode.BAD_REQUEST);
};

export const createUnauthorizedError = (message: string): AppError => {
  return new AppError(message, ErrorCode.UNAUTHORIZED);
};

export const createForbiddenError = (message: string): AppError => {
  return new AppError(message, ErrorCode.FORBIDDEN);
};

export const createNotFoundError = (message: string): AppError => {
  return new AppError(message, ErrorCode.NOT_FOUND);
};

export const createInternalServerError = (message: string): AppError => {
  return new AppError(message, ErrorCode.INTERNAL_SERVER_ERROR);
}; 