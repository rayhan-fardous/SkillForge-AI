"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Sparkles } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="w-full max-w-md rounded-2xl border border-neutral-900 bg-neutral-900/40 p-8 text-center space-y-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Lock className="h-6 w-6 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white tracking-tight">Protected Area</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            This dashboard feature requires authentication. Click the button below to simulate logging into your account.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Simulate Developer Login
          </button>
        </div>

        <p className="text-[10px] text-neutral-500">
          *Note: You can also use the auth switch toggle in the sticky navbar.
        </p>
      </div>
    </div>
  );
};

export default ProtectedRoute;
