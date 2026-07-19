"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PlusCircle, ArrowLeft, CheckCircle } from "lucide-react";

export default function AddGoalPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("Custom Objective");
  const [dueDate, setDueDate] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, source, dueDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to create goal");
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        router.push("/learning-goals");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const inputClass = "w-full input-glass focus:input-glass-focus px-3.5 py-2.5";
  const labelClass = "font-semibold text-slate-300 text-xs";

  return (
    <ProtectedRoute>
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-64 bg-blue-500/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-xl space-y-8 relative z-10">

          {/* Back btn and header */}
          <div className="space-y-5">
            <Link
              href="/learning-goals"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 font-semibold transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Goals
            </Link>
            <div className="border-b border-white/[0.06] pb-6">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-blue-400" />
                Add Learning Goal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Inject a new objective or raw technology checklist directly into your active career dashboard.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_16px_rgba(16,185,129,0.2)]">
                  <CheckCircle className="h-6 w-6 animate-bounce" />
                </div>
                <h3 className="text-sm font-bold text-white">Goal Created Successfully</h3>
                <p className="text-xs text-slate-500">
                  Synthesizing milestones and redirecting you to your goals list...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="space-y-1.5">
                  <label className={labelClass}>Goal / Objective Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Prometheus Observability Dashboards"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Goal Source Type</label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className={inputClass}
                    >
                      <option>Custom Objective</option>
                      <option>AI Engineer Path</option>
                      <option>DevOps &amp; SRE Track</option>
                      <option>Frontend Engineering</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClass}>Target Date</label>
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-primary hover:btn-primary-hover text-white font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Forge New Goal
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
