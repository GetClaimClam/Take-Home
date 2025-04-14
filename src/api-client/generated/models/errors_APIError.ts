/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Error response from the API
 */
export type errors_APIError = {
    /**
     * Additional error details (optional)
     * example: {"field_name": "email", "reason": "invalid_format"}
     */
    details?: Record<string, string>;
    /**
     * The error code identifying the type of error
     * example: invalid_input
     */
    error_code?: string;
    /**
     * A human-readable error message
     * example: Invalid request parameters
     */
    message?: string;
};

