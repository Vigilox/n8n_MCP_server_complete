import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Workflow, Execution } from '../types';
import { API_ENDPOINTS, buildQueryString } from './api';
import logger from '../utils/logger';
import { AppError, createNotFoundError, createBadRequestError } from '../utils/errors';

/**
 * Client for interacting with the n8n API
 */
export class N8nApiClient {
  private axios: AxiosInstance;
  private baseUrl: string;
  
  /**
   * Creates a new n8n API client
   * @param baseUrl The base URL for the n8n API
   * @param apiKey The n8n API key
   */
  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        if (error.response) {
          // Process API error response
          const status = error.response.status;
          const message = error.response.data?.message || error.message;
          
          logger.error(`n8n API error: ${status} ${message}`, {
            status,
            message,
            url: error.config.url,
            method: error.config.method,
          });

          // Map HTTP status codes to appropriate errors
          if (status === 404) {
            throw createNotFoundError(message);
          } else if (status === 400) {
            throw createBadRequestError(message);
          }
        }
        
        // For network errors or other issues
        logger.error(`n8n API request failed: ${error.message}`, {
          error: error.message,
          config: error.config,
        });
        
        throw error;
      }
    );

    logger.info(`n8n API client initialized with base URL: ${baseUrl}`);
  }

  /**
   * Lists all workflows
   * @returns List of workflows
   */
  async listWorkflows(): Promise<{ data: Workflow[] }> {
    try {
      logger.debug('Fetching workflows from n8n');
      const response: AxiosResponse = await this.axios.get(API_ENDPOINTS.WORKFLOWS);
      logger.debug(`Retrieved ${response.data.data.length} workflows`);
      return response.data;
    } catch (error) {
      logger.error('Failed to list workflows', { error });
      throw error;
    }
  }

  /**
   * Gets a specific workflow by ID
   * @param id Workflow ID
   * @returns Workflow details
   */
  async getWorkflow(id: string): Promise<Workflow> {
    try {
      logger.debug(`Fetching workflow with ID: ${id}`);
      const response: AxiosResponse = await this.axios.get(API_ENDPOINTS.WORKFLOW(id));
      return response.data;
    } catch (error) {
      logger.error(`Failed to get workflow with ID: ${id}`, { error });
      throw error;
    }
  }

  /**
   * Executes a workflow
   * @param id Workflow ID
   * @param data Input data for the workflow
   * @returns Execution information
   */
  async executeWorkflow(id: string, data: any = {}): Promise<Execution> {
    try {
      logger.debug(`Executing workflow with ID: ${id}`);
      const payload = {
        workflowData: {
          id
        },
        runData: {
          data
        }
      };
      const response: AxiosResponse = await this.axios.post(
        API_ENDPOINTS.WORKFLOW_EXECUTE(id),
        payload
      );
      return response.data;
    } catch (error) {
      logger.error(`Failed to execute workflow with ID: ${id}`, { error, data });
      throw error;
    }
  }

  /**
   * Lists executions of workflows
   * @param params Query parameters (workflowId, limit, etc.)
   * @returns List of executions
   */
  async listExecutions(params: Record<string, any> = {}): Promise<{ data: Execution[] }> {
    try {
      logger.debug('Fetching workflow executions', { params });
      const query = buildQueryString(params);
      const url = `${API_ENDPOINTS.EXECUTIONS}${query}`;
      const response: AxiosResponse = await this.axios.get(url);
      logger.debug(`Retrieved ${response.data.data.length} executions`);
      return response.data;
    } catch (error) {
      logger.error('Failed to list executions', { error, params });
      throw error;
    }
  }

  /**
   * Gets a specific execution by ID
   * @param id Execution ID
   * @returns Execution details
   */
  async getExecution(id: string): Promise<Execution> {
    try {
      logger.debug(`Fetching execution with ID: ${id}`);
      const response: AxiosResponse = await this.axios.get(API_ENDPOINTS.EXECUTION(id));
      return response.data;
    } catch (error) {
      logger.error(`Failed to get execution with ID: ${id}`, { error });
      throw error;
    }
  }
} 