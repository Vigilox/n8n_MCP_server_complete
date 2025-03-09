import { N8nApiClient } from '../n8n/client';
import { createBadRequestError } from '../utils/errors';
import logger from '../utils/logger';

/**
 * Creates workflow-related function handlers
 * @param n8nClient The n8n API client
 * @returns Object with workflow-related function handlers
 */
export const createWorkflowHandlers = (n8nClient: N8nApiClient) => {
  return {
    /**
     * Lists all workflows
     * @param params Optional filter parameters
     * @returns List of workflows
     */
    n8n_list_workflows: async (params: { filter?: string } = {}) => {
      logger.debug('Handling n8n_list_workflows', { params });
      
      const { filter } = params;
      const response = await n8nClient.listWorkflows();
      
      // Apply filtering if provided
      let workflows = response.data;
      if (filter) {
        const filterLower = filter.toLowerCase();
        workflows = workflows.filter(wf => 
          wf.name.toLowerCase().includes(filterLower)
        );
        logger.debug(`Filtered workflows from ${response.data.length} to ${workflows.length}`);
      }
      
      // Return simplified workflow objects
      return {
        workflows: workflows.map(wf => ({
          id: wf.id,
          name: wf.name,
          active: wf.active,
          createdAt: wf.createdAt,
          updatedAt: wf.updatedAt
        }))
      };
    },
    
    /**
     * Gets a specific workflow by ID
     * @param params Parameters with workflow ID
     * @returns Workflow details
     */
    n8n_get_workflow: async (params: { id: string }) => {
      logger.debug('Handling n8n_get_workflow', { params });
      
      const { id } = params;
      if (!id) {
        throw createBadRequestError('Workflow ID is required');
      }
      
      const workflow = await n8nClient.getWorkflow(id);
      return { workflow };
    },
    
    /**
     * Executes a workflow
     * @param params Parameters with workflow ID and optional input data
     * @returns Execution information
     */
    n8n_execute_workflow: async (params: { id: string; data?: any }) => {
      logger.debug('Handling n8n_execute_workflow', { params });
      
      const { id, data } = params;
      if (!id) {
        throw createBadRequestError('Workflow ID is required');
      }
      
      const execution = await n8nClient.executeWorkflow(id, data || {});
      return { 
        executionId: execution.id,
        status: execution.status
      };
    }
  };
}; 