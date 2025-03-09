import { Express, Request, Response } from 'express';
import { createMCPHandler } from '../mcp/handler';
import { createMethodHandlers } from '../handlers';
import { N8nApiClient } from '../n8n/client';
import config from '../config';
import logger from '../utils/logger';

/**
 * Sets up routes for the Express server
 * @param app Express application
 */
export const setupRoutes = (app: Express): void => {
  // Create n8n API client
  const n8nClient = new N8nApiClient(config.n8n.baseUrl, config.n8n.apiKey);
  
  // Create method handlers
  const methodHandlers = createMethodHandlers(n8nClient);
  
  // Create MCP handler
  const mcpHandler = createMCPHandler(methodHandlers);
  
  // MCP endpoint
  app.post('/mcp', mcpHandler);
  
  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });
  
  // 404 handler for undefined routes
  app.use((req: Request, res: Response) => {
    logger.warn(`Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ error: { code: 404, message: 'Not found' } });
  });
  
  logger.info('Routes configured');
}; 