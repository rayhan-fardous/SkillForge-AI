"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { User, Award, Shield, FileText, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Profile updates stored in simulated backend.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="mx-auto max-w-xl space-y-8">
          
          {/* Header */}
          <div className="border-b border-neutral-900 pb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-400" />
              Member Profile
            </h1>
            <p className="text-xs text-neutral-400">
              Manage your personal metadata, career preferences, and resume connections.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-6 sm:p-8 space-y-6">
            
            {successMsg && (
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs px-3.5 py-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="flex items-center gap-4 border-b border-neutral-900 pb-4">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                  alt="Avatar"
                  className="h-14 w-14 rounded-full object-cover border border-indigo-500/30"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{user?.name}</h3>
                  <p className="text-[10px] text-neutral-500">{user?.role || "Aspiring Engineer"}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Name</label>
                <input
                  type="text"
                  required
                  defaultValue={user?.name || ""}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Email Address</label>
                <input
                  type="email"
                  disabled
                  defaultValue={user?.email || ""}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-neutral-500 cursor-not-allowed"
                />
                <p className="text-[9px] text-neutral-600">Simulated email address cannot be edited.</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Primary Career Goal</label>
                <select className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50">
                  <option>DevOps & SRE Engineer</option>
                  <option>Frontend React/Next.js Engineer</option>
                  <option>AI Engineer (LLMs & RAG)</option>
                  <option>Data Science Specialist</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
