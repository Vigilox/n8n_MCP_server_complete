// Simple test file to verify our implementation
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => {
          const { timestamp, level, message, ...meta } = info;
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      ),
    }),
  ],
});

// Create an Express server
const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// MCP endpoint
app.post('/mcp', (req, res) => {
  const { id, method, params } = req.body;
  
  logger.info(`Received MCP request: ${method}`, { id, method, params });
  
  // Simple handler for n8n_list_workflows
  if (method === 'n8n_list_workflows') {
    // Mock response
    res.json({
      id,
      result: {
        workflows: [
          {
            id: '1',
            name: 'Test Workflow 1',
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Test Workflow 2',
            active: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      },
      error: null
    });
  } else {
    // Method not found
    res.status(404).json({
      id,
      result: null,
      error: {
        code: 404,
        message: `Method '${method}' not found`
      }
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  logger.info(`Server running at http://${HOST}:${PORT}`);
}); 