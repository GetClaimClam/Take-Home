#!/usr/bin/env bun

/**
 * Build script for Next.js app to prepare for AWS S3 deployment
 * 
 * This script:
 * 1. Runs the Next.js build
 * 2. Prepares the output for S3 deployment
 * 3. Can be configured for different environments (staging/production)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get current directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Get environment from args or default to development
const args = process.argv.slice(2);
const ENV = args[0] || 'development';
console.log(`Building for environment: ${ENV}`);

// Load environment variables based on environment
try {
  const envFile = path.join(projectRoot, `.env.${ENV}`);
  if (fs.existsSync(envFile)) {
    console.log(`Loading environment variables from ${envFile}`);
    dotenv.config({ path: envFile });
  } else {
    console.log(`Environment file ${envFile} not found, using default .env if available`);
    dotenv.config();
  }
} catch (error) {
  console.warn('Error loading environment variables:', error.message);
}

// Run the Next.js build
console.log('Running Next.js build...');
try {
  execSync('bun run next build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Create a build info file for debugging/versioning
const buildInfo = {
  buildTime: new Date().toISOString(),
  environment: ENV,
  version: process.env.npm_package_version,
  bunVersion: execSync('bun --version').toString().trim(),
};

const outDir = path.join(projectRoot, 'out');

// Check if the output directory exists (Next.js should create it during build)
if (!fs.existsSync(outDir)) {
  console.error('Output directory not found. Make sure next.config.ts has output: "export" set.');
  process.exit(1);
}

// Write build info to the output directory
fs.writeFileSync(
  path.join(outDir, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);

console.log('Build completed successfully!');
console.log(`Output is ready in ${outDir}`);
console.log('You can now deploy to S3 using the deploy script.');
