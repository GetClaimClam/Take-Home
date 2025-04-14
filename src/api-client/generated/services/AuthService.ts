/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { handlers_LoginRequest } from '../models/handlers_LoginRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Verify authentication token and login user
     * Validates a token and returns user information if valid
     * @param request Login verification request
     * @returns any User information
     * @throws ApiError
     */
    public postApiV1AuthLogin(
        request: handlers_LoginRequest,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/login',
            body: request,
            errors: {
                400: `Invalid input`,
                401: `Authentication error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Logout user
     * Terminates the user's session
     * @returns any Logout successful
     * @throws ApiError
     */
    public postApiV1AuthLogout(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/logout',
            errors: {
                500: `Internal server error`,
            },
        });
    }
}
