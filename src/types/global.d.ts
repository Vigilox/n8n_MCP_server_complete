// Global type declarations

// Declare process.env
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    PORT?: string;
    HOST?: string;
    N8N_BASE_URL?: string;
    N8N_API_KEY?: string;
    LOG_LEVEL?: string;
  }
}

// Declare Error.captureStackTrace
interface ErrorConstructor {
  captureStackTrace(targetObject: object, constructorOpt?: Function): void;
} 