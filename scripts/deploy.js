#!/usr/bin/env bun

/**
 * Deploy script for syncing Next.js app to AWS S3
 * 
 * This script:
 * 1. Syncs the built Next.js app to an S3 bucket
 * 2. Sets proper cache headers and content types
 * 3. Can invalidate CloudFront distribution if configured
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
console.log(`Deploying to environment: ${ENV}`);

// Load environment variables from .env file
const envFile = path.join(projectRoot, `.env.${ENV}`);
if (fs.existsSync(envFile)) {
  console.log(`Loading environment variables from ${envFile}`);
  dotenv.config({ path: envFile });
} else {
  console.log('No environment file found, using default environment variables');
  dotenv.config();
}

// Map environment to CloudFormation stack name
const getStackName = (env) => {
  switch (env) {
    case 'production':
      return 'claimclam-cases-app-prod';
    case 'staging':
      return 'claimclam-cases-app-staging';
    case 'development':
    default:
      return 'claimclam-cases-app-dev';
  }
};

// Get CloudFormation stack outputs
const getStackOutputs = (stackName) => {
  try {
    // Ensure AWS_REGION is set, default to us-east-1 if not
    const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
    console.log(`Using AWS region: ${region}`);
    
    const outputs = JSON.parse(
      execSync(`aws cloudformation describe-stacks --stack-name ${stackName} --region ${region} --query "Stacks[0].Outputs" --output json`).toString()
    );
    
    const result = {};
    outputs.forEach(output => {
      result[output.OutputKey] = output.OutputValue;
    });
    
    return result;
  } catch (error) {
    console.error(`Error getting stack outputs for ${stackName}:`, error.message);
    console.error('Make sure the CloudFormation stack exists and you have the correct AWS credentials.');
    console.error('You can create the stack by running: cd infrastructure && ./deploy-infrastructure.sh ' + ENV);
    process.exit(1);
  }
};

const stackName = getStackName(ENV);
console.log(`Getting outputs from CloudFormation stack: ${stackName}`);
const stackOutputs = getStackOutputs(stackName);

const bucket = stackOutputs.S3BucketName;
const cloudfront = stackOutputs.CloudFrontDistributionId;
const cloudfrontDomain = stackOutputs.CloudFrontDomainName;

if (!bucket) {
  console.error('S3 bucket name not found in CloudFormation outputs.');
  process.exit(1);
}

const outDir = path.join(projectRoot, 'out');

// Check if the output directory exists
if (!fs.existsSync(outDir)) {
  console.error('Output directory not found. Run the build script first.');
  process.exit(1);
}

// Sync to S3 with appropriate cache settings
console.log(`Syncing to S3 bucket: ${bucket}`);
try {
  // Get region for AWS commands
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
  
  // HTML files - short cache time as they might change
  console.log('Syncing HTML files');
  execSync(
    `aws s3 sync ${outDir} s3://${bucket} --delete --cache-control "max-age=3600" --exclude "*" --include "*.html" --region ${region}`,
    { stdio: 'inherit' }
  );
  
  // JS and CSS files - longer cache time as they have content hashes
  console.log('Syncing JS and CSS files');
  execSync(
    `aws s3 sync ${outDir} s3://${bucket} --delete --cache-control "max-age=31536000" --exclude "*" --include "*.js" --include "*.css" --region ${region}`,
    { stdio: 'inherit' }
  );
  
  // Images and other static assets - long cache time
  console.log('Syncing static assets');
  execSync(
    `aws s3 sync ${outDir} s3://${bucket} --delete --cache-control "max-age=31536000" --exclude "*.html" --exclude "*.js" --exclude "*.css" --exclude "_next/data/*" --region ${region}`,
    { stdio: 'inherit' }
  );
  
  // Next.js data files - short cache time
  if (fs.existsSync(path.join(outDir, '_next/data'))) {
    console.log('Syncing Next.js data files');
    execSync(
      `aws s3 sync ${outDir}/_next/data s3://${bucket}/_next/data --delete --cache-control "max-age=3600" --region ${region}`,
      { stdio: 'inherit' }
    );
  } else {
    console.log('No _next/data directory found, skipping sync of Next.js data files');
  }
} catch (error) {
  console.error('S3 sync failed:', error.message);
  
  // List the output directory contents for debugging
  console.error('\nOutput directory contents:');
  try {
    const listOutput = execSync(`ls -la ${outDir}`).toString();
    console.error(listOutput);
    
    // Check if _next directory exists
    if (fs.existsSync(path.join(outDir, '_next'))) {
      console.error('\n_next directory contents:');
      const nextOutput = execSync(`ls -la ${outDir}/_next`).toString();
      console.error(nextOutput);
    } else {
      console.error('\n_next directory does not exist');
    }
  } catch (listError) {
    console.error('Error listing directory contents:', listError.message);
  }
  
  process.exit(1);
}

// Invalidate CloudFront distribution if available
if (cloudfront) {
  console.log(`Invalidating CloudFront distribution: ${cloudfront}`);
  try {
    const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
    execSync(
      `aws cloudfront create-invalidation --distribution-id ${cloudfront} --paths "/*" --region ${region}`,
      { stdio: 'inherit' }
    );
    console.log('CloudFront invalidation created');
  } catch (error) {
    console.error('Error invalidating CloudFront distribution:', error.message);
    // Don't exit on CloudFront invalidation error, it's not critical
  }
}

console.log('Deployment completed successfully!');
if (cloudfrontDomain) {
  console.log(`The app is now available at: https://${cloudfrontDomain}`);
} else {
  console.log(`The app is now available at: https://${bucket}.s3-website-${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com`);
}
if (cloudfront) {
  console.log('CloudFront may take a few minutes to propagate changes.');
}
