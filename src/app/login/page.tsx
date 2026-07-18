"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogIn, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login();
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-900 bg-neutral-900/40 p-8 text-center space-y-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <LogIn className="h-5 w-5" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-xs text-neutral-400">
            Sign in to continue tracking your active learning path.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-neutral-300">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-neutral-300">Password</label>
              <a href="#" className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium">Forgot?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isSubmitting ? "Authenticating..." : "Sign In & Launch Dashboard"}
            </button>
          </div>
        </form>

        <p className="text-[10px] text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-bold">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}
