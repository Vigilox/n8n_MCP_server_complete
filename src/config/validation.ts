import { AppConfig } from '../types';
import logger from '../utils/logger';

/**
 * Validates the application configuration
 * @param config The application configuration
 * @throws Error if validation fails
 */
export const validateConfig = (config: AppConfig): void => {
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