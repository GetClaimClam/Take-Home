/**
 * API Client wrapper
 * 
 * This file provides a configured instance of the generated API client
 * that uses the application's environment configuration.
 */

import { SampleApi, OpenAPI } from './generated';
import { apiConfig } from '@/config';

// Re-export all models and APIs from the generated client
export * from './generated';

// Configure the OpenAPI settings with the environment-specific base URL
OpenAPI.BASE = apiConfig.baseUrl;
OpenAPI.WITH_CREDENTIALS = true;

// Create a configured API client instance
const api = new SampleApi({
  BASE: apiConfig.baseUrl,
  WITH_CREDENTIALS: true,
  HEADERS: {
    'Content-Type': 'application/json',
  },
});

// Export the configured API client for convenience
export { api };
