"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Settings, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoGrade, setAutoGrade] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Settings saved successfully.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="mx-auto max-w-xl space-y-8">
          
          {/* Header */}
          <div className="border-b border-neutral-900 pb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Settings className="h-5 w-5 text-indigo-400" />
              Settings
            </h1>
            <p className="text-xs text-neutral-400">
              Configure your study constraints, AI agent notifications, and API credentials.
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

            <form onSubmit={handleSave} className="space-y-6 text-xs">
              
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Agent Configurations</h3>
                
                <div className="flex items-center justify-between p-3 bg-neutral-950 border border-neutral-900 rounded-lg">
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-neutral-250">Auto-Grade Commits</h4>
                    <p className="text-[10px] text-neutral-500">Trigger AI code assessment on every git push.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoGrade}
                    onChange={() => setAutoGrade(!autoGrade)}
                    className="h-4 w-4 rounded border-neutral-800 text-indigo-600 bg-neutral-950 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-950 border border-neutral-900 rounded-lg">
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-neutral-250">Weekly Email Digests</h4>
                    <p className="text-[10px] text-neutral-500">Receive velocity reports and skill gap suggestions.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={() => setEmailAlerts(!emailAlerts)}
                    className="h-4 w-4 rounded border-neutral-800 text-indigo-600 bg-neutral-950 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Account Credentials</h3>
                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">GitHub Connection Token</label>
                  <input
                    type="password"
                    disabled
                    value="ghp_************************************"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-neutral-500 cursor-not-allowed"
                  />
                  <p className="text-[9px] text-neutral-600">Simulated git integrations are connected.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Save Configuration settings
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
