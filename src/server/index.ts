import express, { Express } from 'express';
import cors from 'cors';
import { ServerConfig } from '../types';
import { requestLogger } from '../utils/logger';
import { setupRoutes } from './routes';
import logger from '../utils/logger';

/**
 * Creates and configures the Express server
 * @param config Server configuration
 * @returns Configured Express server
 */
export const createServer = (config: ServerConfig): Express => {
  const app = express();
  
  // Configure middleware
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);
  
  // Set up routes
  setupRoutes(app);
  
  return app;
};

/**
 * Starts the Express server
 * @param app Express application
 * @param config Server configuration
 * @returns HTTP server instance
 */
export const startServer = (app: Express, config: ServerConfig) => {
  return app.listen(config.port, config.host, () => {
    logger.info(`Server running at http://${config.host}:${config.port}`);
  });
}; 