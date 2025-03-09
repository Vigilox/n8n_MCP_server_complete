import { createServer, startServer } from './server';
import config from './config';
import logger from './utils/logger';

/**
 * Main application entry point
 */
async function main() {
  try {
    logger.info('Starting n8n MCP server');
    
    // Create and start the server
    const app = createServer(config.server);
    startServer(app, config.server);
    
    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      process.exit(0);
    });
    
    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully');
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

// Start the application
main().catch(error => {
  logger.error('Unhandled error in main', { error });
  process.exit(1);
}); 