// Simple Express server
const express = require('express');
const app = express();

console.log('Starting simple server...');

try {
  // Parse JSON requests
  app.use(express.json());
  console.log('JSON middleware configured');

  // Health check endpoint
  app.get('/health', (req, res) => {
    console.log('Health check requested');
    res.status(200).json({ status: 'ok' });
  });
  console.log('Routes configured');

  // Start the server
  const PORT = 3000;
  console.log(`Attempting to start server on port ${PORT}...`);
  
  const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error);
  });
} catch (error) {
  console.error('Error setting up server:', error);
} 