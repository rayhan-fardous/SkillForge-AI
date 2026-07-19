"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FolderKanban, ArrowLeft, Trash2, CheckSquare, Square } from "lucide-react";

export default function ManageGoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGoals(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const toggleComplete = async (id: string, currentCompleted: boolean) => {
    try {
      const res = await fetch("/api/goals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !currentCompleted }),
      });
      if (res.ok) {
        setGoals(
          goals.map((g) =>
            g.id === id ? { ...g, completed: !g.completed } : g
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      const res = await fetch("/api/goals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setGoals(goals.filter((g) => g.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-64 bg-blue-500/4 rounded-full blur-[120px] pointer-events-none" />

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
                <FolderKanban className="h-5 w-5 text-blue-400" />
                Manage Goals
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Mark active objectives as complete, configure milestone structures, or remove obsolete tags.
              </p>
            </div>
          </div>

          {/* Goals List Card */}
          <div className="glass-card rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              </div>
            ) : goals.length > 0 ? (
              <div className="space-y-2">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    className={`flex items-center justify-between gap-4 p-3 rounded-xl text-xs transition-all duration-200 ${
                      g.completed
                        ? "bg-white/[0.01] border border-white/[0.04]"
                        : "bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleComplete(g.id, g.completed)}
                        className="text-slate-500 hover:text-blue-400 transition-colors cursor-pointer flex-shrink-0"
                      >
                        {g.completed ? (
                          <CheckSquare className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                      <span className={`font-semibold transition-all ${g.completed ? "text-slate-600 line-through" : "text-slate-200"}`}>
                        {g.title}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteGoal(g.id)}
                      className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-slate-600 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all cursor-pointer flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 space-y-2 text-slate-500">
                <p className="text-xs">No learning goals left. Forge a new one!</p>
                <Link
                  href="/items/add"
                  className="inline-block text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Create Goal
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
