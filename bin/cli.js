#!/usr/bin/env node

/**
 * Command-line interface for n8n MCP server
 * Allows running the server directly via npx
 */

const path = require('path');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

// Determine if we're running in a development or production environment
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

// Define paths
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const srcDir = path.join(projectRoot, 'src');

// Check if we need to build the project
if (isDevelopment && !fs.existsSync(path.join(distDir, 'app.js'))) {
  console.log('Building the project...');
  try {
    execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to build the project:', error.message);
    process.exit(1);
  }
}

// Main entry point file (either compiled JS or TypeScript with ts-node)
const entryPoint = isDevelopment && !fs.existsSync(path.join(distDir, 'app.js'))
  ? path.join(srcDir, 'app.ts')
  : path.join(distDir, 'app.js');

console.log(`Starting n8n MCP server from ${entryPoint}...`);

// Run the server
const serverProcess = isDevelopment && entryPoint.endsWith('.ts')
  ? spawn('npx', ['ts-node', entryPoint], { stdio: 'inherit' })
  : spawn('node', [entryPoint], { stdio: 'inherit' });

// Handle process events
serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down server...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down server...');
  serverProcess.kill('SIGTERM');
}); 