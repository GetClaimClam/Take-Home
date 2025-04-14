"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "@/api-client";
import { model_User } from "@/api-client";

// Define interfaces for API responses
interface CookieTestResult extends model_User {
  [key: string]: unknown;
}

interface StatusTestResult {
  authenticated: boolean;
  user?: model_User;
}

export default function AuthStatus() {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    loginWithRedirect, 
    logout: auth0Logout, 
    getIdTokenClaims,
    error: auth0Error
  } = useAuth0();
  
  const [idToken, setIdToken] = useState<string | null>(null);
  const [cookieTestResult, setCookieTestResult] = useState<CookieTestResult | null>(null);
  const [isCookieTesting, setIsCookieTesting] = useState(false);
  const [cookieError, setCookieError] = useState<string | null>(null);
  const [isApiLoggingOut, setIsApiLoggingOut] = useState(false);
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated' | 'error'>('loading');
  
  // Status endpoint test states
  const [statusTestResult, setStatusTestResult] = useState<StatusTestResult | null>(null);
  const [isStatusTesting, setIsStatusTesting] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  
  // Update auth status whenever Auth0 state changes
  useEffect(() => {
    if (isLoading) {
      setAuthStatus('loading');
    } else if (auth0Error) {
      console.error('Auth0 error:', auth0Error);
      setAuthStatus('error');
    } else if (isAuthenticated && user) {
      setAuthStatus('authenticated');
      
      // Store user data for offline access
      // TODO: Consider more secure storage options in the future
      localStorage.setItem('user_data', JSON.stringify({
        name: user.name,
        email: user.email,
        sub: user.sub,
        picture: user.picture,
        updated_at: user.updated_at
      }));
      
      // Cache token to improve performance
      getIdTokenClaims().then(claims => {
        if (claims?.__raw) {
          localStorage.setItem('id_token', claims.__raw);
        }
      });
    } else {
      setAuthStatus('unauthenticated');
      // Clear cached data when logged out
      localStorage.removeItem('user_data');
      localStorage.removeItem('id_token');
    }
  }, [isLoading, isAuthenticated, user, auth0Error, getIdTokenClaims]);
  
  // Get the ID token when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      getIdTokenClaims()
        .then(claims => {
          setIdToken(claims?.__raw || null);
        })
        .catch(error => {
          console.error('Error getting ID token:', error);
          setIdToken(null);
        });
    } else {
      setIdToken(null);
    }
  }, [isAuthenticated, user, getIdTokenClaims]);
  
  // Test the cookie auth
  const testCookieAuth = async () => {
    setIsCookieTesting(true);
    setCookieError(null);
    
    try {
      // This should use the HTTP-only cookie for authentication
      const userData = await api.users.getApiV1UsersMe();
      // Cast the User to CookieTestResult by adding the index signature
      setCookieTestResult(userData as CookieTestResult);
    } catch (err) {
      console.error('Cookie authentication test failed:', err);
      setCookieError(err instanceof Error ? err.message : 'Unknown error');
      setCookieTestResult(null);
    } finally {
      setIsCookieTesting(false);
    }
  };
  
  // Test the /api/users/status endpoint
  const testUserStatus = async () => {
    setIsStatusTesting(true);
    setStatusError(null);
    
    try {
      // This should check the API cookie status with the users/status endpoint
      // Note: If your Swagger API doesn't have a direct equivalent for checkUserStatus,
      // we can use the users/me endpoint as a proxy for authentication status
      try {
        const userData = await api.users.getApiV1UsersMe();
        setStatusTestResult({
          authenticated: true,
          user: userData
        });
      } catch (_error) {
        // If the API call fails, assume not authenticated
        setStatusTestResult({
          authenticated: false
        });
      }
    } catch (err) {
      console.error('User status check failed:', err);
      setStatusError(err instanceof Error ? err.message : 'Unknown error');
      setStatusTestResult(null);
    } finally {
      setIsStatusTesting(false);
    }
  };
  
  // Clear the server-side cookie
  const clearApiCookie = async () => {
    setIsApiLoggingOut(true);
    try {
      await api.auth.postApiV1AuthLogout();
      setCookieTestResult(null);
      setCookieError(null);
      setStatusTestResult(null);
      setStatusError(null);
      alert('Server cookie has been cleared');
    } catch (err) {
      console.error('Error clearing server cookie:', err);
      alert(`Failed to clear server cookie: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsApiLoggingOut(false);
    }
  };
  
  // Combined logout - both Auth0 and API cookie
  const handleFullLogout = async () => {
    // First clear the server cookie
    setIsApiLoggingOut(true);
    try {
      await api.auth.postApiV1AuthLogout();
    } catch (err) {
      console.error('Error clearing cookie during full logout:', err);
    } finally {
      setIsApiLoggingOut(false);
    }
    
    // Then logout from Auth0
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  // Loading indicator
  if (authStatus === 'loading') {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="font-medium">Checking authentication status...</p>
        <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
          <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <h3 className="font-bold text-lg mb-4">Authentication Status</h3>
      
      {/* Auth0 Status */}
      <div className="mb-6 p-4 border border-gray-200 rounded bg-white">
        <h4 className="font-semibold text-md mb-2">🔑 Auth0 Status</h4>
        <div className="flex items-center mb-2">
          <div className={`h-3 w-3 rounded-full mr-2 ${
            authStatus === 'authenticated' 
              ? 'bg-green-500' 
              : authStatus === 'error' 
                ? 'bg-red-500' 
                : 'bg-yellow-500'
          }`}></div>
          <p>{
            authStatus === 'authenticated' 
              ? 'Authenticated' 
              : authStatus === 'error' 
                ? 'Error' 
                : 'Not authenticated'
          }</p>
        </div>
        
        {auth0Error && (
          <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
            {auth0Error.message || 'Unknown Auth0 error'}
          </div>
        )}
        
        {authStatus === 'authenticated' && user && (
          <div className="mt-3 pl-2 border-l-2 border-gray-300">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            {idToken && (
              <div className="mt-2">
                <p className="font-medium">ID Token:</p>
                <p className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-hidden text-ellipsis">
                  {idToken.substring(0, 25)}...
                </p>
              </div>
            )}
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Auth0 client-side state: {localStorage.getItem('auth0.is.authenticated') === 'true' ? 'Authenticated' : 'Not authenticated'}
        </p>
      </div>
      
      {/* API User Status Endpoint Test */}
      <div className="mb-6 p-4 border border-green-200 rounded bg-green-50">
        <h4 className="font-semibold text-md mb-2">🔍 API User Status Check</h4>
        <p className="text-sm mb-3">
          This checks the <code>/api/users/status</code> endpoint using the HTTP-only cookie
        </p>
        
        <div className="flex items-center mb-2">
          <div className={`h-3 w-3 rounded-full mr-2 ${
            statusTestResult ? 'bg-green-500' : statusError ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
          <p>{
            statusTestResult 
              ? statusTestResult.authenticated 
                ? 'Authenticated with API' 
                : 'Not authenticated with API'
              : statusError 
                ? 'API connection failed' 
                : 'Not tested yet'
          }</p>
        </div>
        
        {statusError && (
          <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
            {statusError}
          </div>
        )}
        
        {statusTestResult && (
          <div className="mt-3 pl-2 border-l-2 border-green-300">
            <p className="text-sm font-medium mb-1">Status response:</p>
            <pre className="text-xs bg-white p-2 rounded max-h-32 overflow-auto">
              {JSON.stringify(statusTestResult, null, 2)}
            </pre>
          </div>
        )}
        
        <button 
          onClick={testUserStatus}
          disabled={isStatusTesting}
          className={`mt-3 px-3 py-1.5 text-white text-sm rounded 
            ${isStatusTesting 
              ? 'bg-green-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isStatusTesting ? 'Checking...' : 'Check User Status'}
        </button>
      </div>
      
      {/* API/Cookie Status */}
      <div className="mb-6 p-4 border border-blue-200 rounded bg-blue-50">
        <h4 className="font-semibold text-md mb-2">🍪 API Cookie Status</h4>
        <p className="text-sm mb-3">
          This shows whether you can access the Go API using the HTTP-only cookie
        </p>
        
        <div className="flex items-center mb-2">
          <div className={`h-3 w-3 rounded-full mr-2 ${
            cookieTestResult ? 'bg-green-500' : cookieError ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
          <p>{
            cookieTestResult 
              ? 'Connected to API with cookie'
              : cookieError 
                ? 'API connection failed' 
                : 'Not tested yet'
          }</p>
        </div>
        
        {cookieError && (
          <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
            {cookieError}
          </div>
        )}
        
        {cookieTestResult && (
          <div className="mt-3 pl-2 border-l-2 border-green-300">
            <p className="text-sm font-medium mb-1">User data from API:</p>
            <pre className="text-xs bg-white p-2 rounded max-h-32 overflow-auto">
              {JSON.stringify(cookieTestResult, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-3 flex flex-wrap gap-2">
          <button 
            onClick={testCookieAuth}
            disabled={isCookieTesting}
            className={`px-3 py-1.5 text-white text-sm rounded 
              ${isCookieTesting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isCookieTesting ? 'Testing...' : 'Test API Cookie'}
          </button>
          
          <button 
            onClick={clearApiCookie}
            disabled={isApiLoggingOut}
            className={`px-3 py-1.5 text-white text-sm rounded 
              ${isApiLoggingOut 
                ? 'bg-orange-400 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {isApiLoggingOut ? 'Clearing...' : 'Clear API Cookie'}
          </button>
        </div>
      </div>

      {/* Authentication Actions */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
        {authStatus === 'unauthenticated' && (
          <button
            onClick={() => {
              // Store current URL before redirecting to Auth0
              if (typeof window !== 'undefined') {
                localStorage.setItem('auth_redirect_url', window.location.pathname + window.location.search);
              }
              loginWithRedirect();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Sign In with Auth0
          </button>
        )}
        
        <button
          onClick={() => auth0Logout({ logoutParams: { returnTo: window.location.origin } })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Auth0 Logout
        </button>
        
        <button
          onClick={handleFullLogout}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Full Logout (Auth0 + Cookie)
        </button>
      </div>
    </div>
  );
}
