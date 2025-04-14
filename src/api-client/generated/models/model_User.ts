/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { model_BusinessInfo } from './model_BusinessInfo';
/**
 * A user in the system
 */
export type model_User = {
    /**
     * Contact information
     */
    addressLine1?: string;
    addressLine2?: string;
    /**
     * Business information (if applicable)
     */
    businessInfo?: model_BusinessInfo;
    city?: string;
    createdAt?: string;
    createdBy?: string;
    dateOfBirth?: string;
    email?: string;
    firstName?: string;
    /**
     * Core user information
     */
    id?: string;
    /**
     * Metadata
     */
    lastLogin?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: string;
    /**
     * Authorization and agreement tracking
     */
    signedLatest?: boolean;
    state?: string;
    updatedAt?: string;
    zipCode?: string;
};

