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

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="mx-auto max-w-xl space-y-8">
          
          {/* Back btn and header */}
          <div className="space-y-4">
            <Link
              href="/learning-goals"
              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-300 font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Goals
            </Link>
            <div className="border-b border-neutral-900 pb-6">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-indigo-400" />
                Add Learning Goal
              </h1>
              <p className="text-xs text-neutral-400">
                Inject a new objective or raw technology checklist directly into your active career dashboard.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-6 sm:p-8 space-y-6">
            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="h-5 w-5 animate-bounce" />
                </div>
                <h3 className="text-sm font-bold text-white">Goal Created Successfully</h3>
                <p className="text-xs text-neutral-500">
                  Synthesizing milestones and loading redirecting you to your goals list...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">Goal / Objective Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Prometheus Observability Dashboards"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-neutral-300">Goal Source Type</label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                    >
                      <option>Custom Objective</option>
                      <option>AI Engineer Path</option>
                      <option>DevOps & SRE Track</option>
                      <option>Frontend Engineering</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-neutral-300">Target Date</label>
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-lg transition-colors cursor-pointer"
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
