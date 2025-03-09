import { N8nApiClient } from '../n8n/client';
import { MethodHandlers } from '../types';
import { createWorkflowHandlers } from './workflows';
import { createExecutionHandlers } from './executions';

/**
 * Creates all MCP method handlers
 * @param n8nClient The n8n API client
 * @returns Object with all method handlers
 */
export const createMethodHandlers = (n8nClient: N8nApiClient): MethodHandlers => {
  // Create individual handler groups
  const workflowHandlers = createWorkflowHandlers(n8nClient);
  const executionHandlers = createExecutionHandlers(n8nClient);
  
  // Combine all handlers
  return {
    ...workflowHandlers,
    ...executionHandlers,
  };
}; 