import { NextRequest, NextResponse } from 'next/server';

// Sample user profile data
const userProfiles = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    ssn: "123-45-6789",
    creditCard: "4111-1111-1111-1111",
    address: "123 Main St, Anytown, USA"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    ssn: "987-65-4321",
    creditCard: "5555-5555-5555-4444",
    address: "456 Oak Ave, Somewhere, USA"
  }
];

export async function GET(request: NextRequest) {
  // Get the user ID from the query parameters
  const userId = request.nextUrl.searchParams.get('id');
  
  // Find the user profile
  const userProfile = userProfiles.find(profile => profile.id === Number(userId));
  
  // Return the response with permissive CORS headers
  // TODO: Restrict these headers before going to production
  return NextResponse.json(userProfile || { error: "User not found" }, {
    status: userProfile ? 200 : 404,
    headers: {
      // Extremely permissive CORS headers - allows any origin to access this API
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    }
  });
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    }
  });
}
