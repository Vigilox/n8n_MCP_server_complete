// MCP related types
export interface MCPRequest {
  jsonrpc?: string;
  id: string | number | null;
  method: string;
  params?: Record<string, any>;
}

export interface MCPResponse {
  jsonrpc: string;
  id: string | number | null;
  result?: any;
  error?: MCPError;
}

export interface MCPError {
  code: number;
  message: string;
  data?: any;
}

// n8n related types
export interface Workflow {
  id: string;
  name: string;
  active: boolean;
  nodes?: any[];
  connections?: any[];
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface Execution {
  id: string;
  workflowId: string;
  status: 'running' | 'success' | 'error' | 'waiting';
  startedAt: string;
  finishedAt?: string;
  data?: any;
  nodeExecutionStatus?: Record<string, any>;
  [key: string]: any;
}

// Function handler types
export type HandlerFunction = (params?: any) => Promise<any>;

export interface MethodHandlers {
  [method: string]: HandlerFunction;
}

// Configuration types
export interface ServerConfig {
  port: number;
  host: string;
}

export interface N8nConfig {
  baseUrl: string;
  apiKey: string;
}

export interface LogConfig {
  level: string;
}

export interface AppConfig {
  server: ServerConfig;
  n8n: N8nConfig;
  logging: LogConfig;
} 