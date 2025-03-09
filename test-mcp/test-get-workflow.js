#!/usr/bin/env node

/**
 * Test script for n8n_get_workflow method
 * This script sends an MCP request to get a specific workflow
 */

const axios = require('axios');

const SERVER_URL = 'http://localhost:3000/mcp';

// Replace with an actual workflow ID from your n8n instance
const WORKFLOW_ID = '1'; 

async function testGetWorkflow() {
  console.log(`Testing n8n_get_workflow with workflow ID: ${WORKFLOW_ID}...`);
  try {
    const response = await axios.post(SERVER_URL, {
      jsonrpc: '2.0',
      id: '3',
      method: 'n8n_get_workflow',
      params: {
        workflowId: WORKFLOW_ID
      }
    });

    console.log('Response:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\nTest completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testGetWorkflow(); 