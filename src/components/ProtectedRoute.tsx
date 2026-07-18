"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isPending, router]);

  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-neutral-950">
        <div className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
