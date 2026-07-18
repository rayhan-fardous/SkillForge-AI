"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserPlus, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login();
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-neutral-955 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-900 bg-neutral-900/40 p-8 text-center space-y-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <UserPlus className="h-5 w-5" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-xs text-neutral-400">
            Start forging your custom career path. Free tier available.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-left text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-neutral-300">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-neutral-300">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@domain.com"
              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-neutral-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 characters"
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
              {isSubmitting ? "Generating Account..." : "Create Account & Start"}
            </button>
          </div>
        </form>

        <p className="text-[10px] text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
