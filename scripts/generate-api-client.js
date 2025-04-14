#!/usr/bin/env node

/**
 * Script to generate TypeScript API client from OpenAPI/Swagger specification
 * 
 * Usage:
 *   bun run generate-api-client [path-to-swagger-file]
 * 
 * If no path is provided, it will use the default location:
 *   src/api-client/specs/swagger.json
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Default swagger file location
const DEFAULT_SWAGGER_PATH = path.resolve(__dirname, '../src/api-client/specs/swagger.json');

// Get the swagger file path from command line arguments or use default
const swaggerFile = process.argv[2] || DEFAULT_SWAGGER_PATH;

// Check if the swagger file exists (if it's a local file)
if (!swaggerFile.startsWith('http') && !fs.existsSync(swaggerFile)) {
  console.error(`Error: Swagger file not found at ${swaggerFile}`);
  console.error('Please make sure the file exists or provide a valid path/URL as an argument');
  console.error('Usage: bun run generate-api-client [path-to-swagger-file]');
  process.exit(1);
}

// Output directory for generated client
const outputDir = path.resolve(__dirname, '../src/api-client/generated');

// Clean the output directory
console.log(`Cleaning output directory: ${outputDir}`);
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// Generate the API client
console.log(`Generating API client from: ${swaggerFile}`);
try {
  execSync(
    `bunx openapi --input ${swaggerFile} --output ${outputDir} --client axios --name ClaimClamApi`,
    { stdio: 'inherit' }
  );
  
  console.log('API client generated successfully!');
} catch (error) {
  console.error('Error generating API client:', error.message);
  process.exit(1);
}
