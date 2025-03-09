#!/usr/bin/env node

/**
 * Test script for n8n_list_workflows method
 * This script sends an MCP request to list all n8n workflows
 * 
 * Note: This test requires a running n8n instance and proper configuration in .env
 * If n8n is not running, you'll get an error, which is expected in that case.
 */

const axios = require('axios');

const SERVER_URL = 'http://localhost:3000/mcp';

async function testListWorkflows() {
  console.log('Testing n8n_list_workflows...');
  console.log('Note: This test requires a running n8n instance with proper API configuration.');
  
  try {
    const response = await axios.post(SERVER_URL, {
      jsonrpc: '2.0',
      id: '2',
      method: 'n8n_list_workflows',
      params: {}
    });

    console.log('Response:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\nTest completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.log('\nIf n8n is not running, this error is expected. Please make sure:');
      console.log('1. n8n is running (e.g., by running "npx n8n start")')
      console.log('2. Your .env file has the correct N8N_BASE_URL and N8N_API_KEY values');
    }
  }
}

// Run the test
testListWorkflows(); 