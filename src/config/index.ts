/**
 * Application configuration
 * 
 * This file contains environment-specific configuration settings
 * that can be used throughout the application.
 */

// Determine the current environment using a single environment variable
// NEXT_PUBLIC_APP_ENV can be 'production', 'staging', or 'development' (default)
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development';

// API configuration
export const apiConfig = {
  // Use environment-specific API URLs based on a single environment variable
  baseUrl: 
    APP_ENV === 'production' 
      ? 'https://api.chariot.claims'
      : APP_ENV === 'staging'
        ? 'https://staging.api.chariot.claims'
        : 'http://localhost:3000',
};

// Export other configuration settings as needed
export const config = {
  api: apiConfig,
  // Current environment
  environment: APP_ENV,
  // Add other configuration sections as needed
};

export default config;
