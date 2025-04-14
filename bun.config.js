/**
 * Bun configuration file
 * 
 * This file configures Bun for the project, including plugins and other settings.
 * See https://bun.sh/docs/runtime/configuration
 */

export default {
  // Configure Bun to use ESM for all JavaScript files
  loader: {
    '.js': 'module',
    '.mjs': 'module',
    '.cjs': 'commonjs',
    '.json': 'json',
    '.jsx': 'module',
    '.ts': 'module',
    '.tsx': 'module',
  },
  
  // Define environment variables that should be available at runtime
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  
  // Configure plugins
  plugins: [],
  
  // Configure Bun's test runner
  test: {
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/out/**'],
  },
  
  // Configure the development server
  development: {
    port: 3000,
  },
};
