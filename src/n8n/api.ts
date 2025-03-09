/**
 * Constants and helpers for working with n8n API
 */

// API endpoints
export const API_ENDPOINTS = {
  // Workflow endpoints
  WORKFLOWS: '/workflows',
  WORKFLOW: (id: string) => `/workflows/${id}`,
  WORKFLOW_EXECUTE: (id: string) => `/workflows/${id}/execute`,
  
  // Execution endpoints
  EXECUTIONS: '/executions',
  EXECUTION: (id: string) => `/executions/${id}`,
  EXECUTION_ACTIVE: '/executions/active',
};

// Helper functions for building query parameters
export const buildQueryString = (params: Record<string, any>): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  
  return query ? `?${query}` : '';
}; 