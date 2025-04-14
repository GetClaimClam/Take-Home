/**
 * API functions for user-related operations
 */
import { api, model_User } from '@/api-client';

// Types
export type User = model_User;

export interface UserPreferences {
  emailNotifications: boolean;
  savedCategories: string[];
  // Add other preference fields as needed
}

/**
 * Claim history item interface
 */
export interface ClaimHistoryItem {
  id: string;
  date: string;
  status: string;
  amount?: number;
  description?: string;
  // Add other claim history fields as needed
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<User> {
  return api.users.getApiV1UsersMe();
}

/**
 * Update user profile information
 */
export async function updateUserProfile(profileData: Partial<User>): Promise<User> {
  // Get the current user first to ensure we have all fields
  const currentUser = await api.users.getApiV1UsersMe();
  
  // Merge the current user with the profile data
  const updatedUser = {
    ...currentUser,
    ...profileData,
  };
  
  return api.users.putApiV1UsersMe(updatedUser);
}

/**
 * Get user preferences
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function getUserPreferences(): Promise<UserPreferences> {
  // This is a placeholder until the API endpoint is available
  // You may need to adapt this based on your actual API structure
  return {
    emailNotifications: true,
    savedCategories: [],
  };
}

/**
 * Update user preferences
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
  // This is a placeholder until the API endpoint is available
  // You may need to adapt this based on your actual API structure
  return {
    emailNotifications: preferences.emailNotifications ?? true,
    savedCategories: preferences.savedCategories ?? [],
  };
}

/**
 * Get user's saved case IDs
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function getSavedCases(): Promise<string[]> {
  // This is a placeholder until the API endpoint is available
  return [];
}

/**
 * Save a case for the user
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function saveCase(_caseId: string): Promise<void> {
  // This is a placeholder until the API endpoint is available
}

/**
 * Remove a case from saved cases
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function removeSavedCase(_caseId: string): Promise<void> {
  // This is a placeholder until the API endpoint is available
}

/**
 * Get the user's claim history
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function getClaimHistory(): Promise<ClaimHistoryItem[]> {
  // This is a placeholder until the API endpoint is available
  return [];
}

/**
 * Request password reset
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function requestPasswordReset(_email: string): Promise<void> {
  // This is a placeholder until the API endpoint is available
}

/**
 * Change user password (when logged in)
 * Note: This endpoint might not be available in the Swagger API yet
 */
export async function changePassword(_currentPassword: string, _newPassword: string): Promise<void> {
  // This is a placeholder until the API endpoint is available
}

/**
 * Log out the current user (clear the auth cookie on the server)
 */
export async function logout(): Promise<void> {
  return api.auth.postApiV1AuthLogout();
}
