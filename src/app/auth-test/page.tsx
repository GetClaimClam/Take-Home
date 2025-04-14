"use client";

import AuthStatus from "@/components/AuthStatus";
import Link from "next/link";

export default function AuthTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Auth0 + Backend Testing</h1>
      
      <div className="mb-8">
        <AuthStatus />
      </div>
      
      <div className="mt-8">
        <Link 
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
