import { N8nApiClient } from '../n8n/client';
import { createBadRequestError } from '../utils/errors';
import logger from '../utils/logger';

/**
 * Creates execution-related function handlers
 * @param n8nClient The n8n API client
 * @returns Object with execution-related function handlers
 */
export const createExecutionHandlers = (n8nClient: N8nApiClient) => {
  return {
    /**
     * Lists executions of workflows
     * @param params Parameters with optional workflow ID and limit
     * @returns List of executions
     */
    n8n_list_executions: async (params: { workflowId?: string; limit?: number } = {}) => {
      logger.debug('Handling n8n_list_executions', { params });
      
      const { workflowId, limit } = params;
      const queryParams: Record<string, any> = {};
      
      if (workflowId) {
        queryParams.workflowId = workflowId;
      }
      
      if (limit && !isNaN(Number(limit))) {
        queryParams.limit = limit;
      }
      
      const response = await n8nClient.listExecutions(queryParams);
      
      // Return simplified execution objects
      return {
        executions: response.data.map(exec => ({
          id: exec.id,
          workflowId: exec.workflowId,
          status: exec.status,
          startedAt: exec.startedAt,
          finishedAt: exec.finishedAt
        }))
      };
    },
    
    /**
     * Gets a specific execution by ID
     * @param params Parameters with execution ID
     * @returns Execution details
     */
    n8n_get_execution: async (params: { id: string }) => {
      logger.debug('Handling n8n_get_execution', { params });
      
      const { id } = params;
      if (!id) {
        throw createBadRequestError('Execution ID is required');
      }
      
      const execution = await n8nClient.getExecution(id);
      return { execution };
    }
  };
}; 