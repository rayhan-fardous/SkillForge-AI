"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { User, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Profile updates stored in simulated backend.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const inputClass = "w-full input-glass focus:input-glass-focus px-3.5 py-2.5";
  const labelClass = "font-semibold text-slate-300 text-xs";

  return (
    <ProtectedRoute>
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-96 h-72 bg-blue-500/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-xl space-y-8 relative z-10">

          {/* Header */}
          <div className="border-b border-white/[0.06] pb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" />
              Member Profile
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage your personal metadata, career preferences, and resume connections.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Top glow accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {successMsg && (
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs px-3.5 py-2.5 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Avatar row */}
              <div className="flex items-center gap-4 border-b border-white/[0.06] pb-5">
                <div className="relative">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                    alt="Avatar"
                    className="h-14 w-14 rounded-full object-cover border-2 border-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.2)]"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-[#0B1120]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{user?.name}</h3>
                  <p className="text-[10px] text-slate-500">{user?.role || "Aspiring Engineer"}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  required
                  defaultValue={user?.name || ""}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  disabled
                  defaultValue={user?.email || ""}
                  className="w-full bg-white/[0.015] border border-white/[0.04] rounded-xl px-3.5 py-2.5 text-[10px] text-slate-600 cursor-not-allowed"
                />
                <p className="text-[9px] text-slate-600">Simulated email address cannot be edited.</p>
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Primary Career Goal</label>
                <select className={inputClass}>
                  <option>DevOps &amp; SRE Engineer</option>
                  <option>Frontend React/Next.js Engineer</option>
                  <option>AI Engineer (LLMs &amp; RAG)</option>
                  <option>Data Science Specialist</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-primary hover:btn-primary-hover text-white font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer"
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
