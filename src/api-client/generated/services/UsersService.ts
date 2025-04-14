/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { model_User } from '../models/model_User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get user
     * Get user details by ID from auth token
     * @returns model_User OK
     * @throws ApiError
     */
    public getApiV1UsersMe(): CancelablePromise<model_User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/users/me',
            errors: {
                400: `Invalid input`,
                401: `Authentication error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update user
     * Update user details
     * @param user User object (ID will be ignored and taken from auth token)
     * @returns model_User OK
     * @throws ApiError
     */
    public putApiV1UsersMe(
        user: model_User,
    ): CancelablePromise<model_User> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/users/me',
            body: user,
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Delete user account
     * Delete user account from the system
     * @returns any User deleted successfully
     * @throws ApiError
     */
    public deleteApiV1UsersMe(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/users/me',
            errors: {
                404: `User not found`,
                500: `Internal server error`,
            },
        });
    }
}
