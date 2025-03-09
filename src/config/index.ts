import dotenv from 'dotenv';
import { AppConfig } from '../types';
import logger from '../utils/logger';

// Load environment variables from .env file
dotenv.config();

// Create configuration object
const config: AppConfig = {
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || 'localhost',
  },
  n8n: {
    baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678/api',
    apiKey: process.env.N8N_API_KEY || '',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

// Validate configuration
const validateConfig = (config: AppConfig): void => {
  const validationErrors: string[] = [];

  // Validate server config
  if (!config.server.port || isNaN(config.server.port)) {
    validationErrors.push('Invalid server port');
  }

  if (!config.server.host) {
    validationErrors.push('Server host is required');
  }

  // Validate n8n config
  if (!config.n8n.baseUrl) {
    validationErrors.push('n8n base URL is required');
  }

  if (!config.n8n.apiKey) {
    validationErrors.push('n8n API key is required');
  }

  // Log validation issues
  if (validationErrors.length > 0) {
    logger.error('Configuration validation failed', { errors: validationErrors });
    throw new Error(`Configuration validation failed: ${validationErrors.join(', ')}`);
  }

  logger.info('Configuration validation successful');
};

// Validate configuration
validateConfig(config);

export default config; 