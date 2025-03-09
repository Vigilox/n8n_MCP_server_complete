#!/usr/bin/env node

/**
 * Test script for mcp.tools.list method
 * This script sends an MCP request to list all available tools
 */

const axios = require('axios');

const SERVER_URL = 'http://localhost:3000/mcp';

async function testToolsList() {
  console.log('Testing mcp.tools.list...');
  try {
    const response = await axios.post(SERVER_URL, {
      jsonrpc: '2.0',
      id: '1',
      method: 'mcp.tools.list',
      params: {}
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
testToolsList(); 