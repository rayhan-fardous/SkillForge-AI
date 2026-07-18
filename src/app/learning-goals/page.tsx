"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BookOpen, FolderKanban, Plus, Clock, CheckCircle } from "lucide-react";

export default function LearningGoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="mx-auto max-w-4xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-400" />
                Learning Goals
              </h1>
              <p className="text-xs text-neutral-400">
                Track your structured educational milestones, custom objectives, and targeted completions.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/items/add"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Goal
              </Link>
              <Link
                href="/items/manage"
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-805 text-neutral-300 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <FolderKanban className="h-3.5 w-3.5" />
                Manage
              </Link>
            </div>
          </div>

          {/* Active Goals Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            </div>
          ) : goals.length === 0 ? (
            <div className="text-center py-16 border border-neutral-900 bg-neutral-900/10 rounded-xl space-y-3">
              <BookOpen className="h-8 w-8 text-neutral-600 mx-auto" />
              <h3 className="text-sm font-semibold text-neutral-300">No active goals</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Start adding milestones from AI roadmaps or create your own custom learning objective.
              </p>
              <div className="pt-2">
                <Link
                  href="/items/add"
                  className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Create Goal
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((g) => (
                <div
                  key={g.id}
                  className="rounded-xl border border-neutral-900 bg-neutral-900/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        {g.source}
                      </span>
                      <span className="text-neutral-500 font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Target: {g.dueDate}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {g.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-40 bg-neutral-950 rounded-full h-1.5 overflow-hidden border border-neutral-900">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: `${g.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-neutral-500 font-semibold">{g.progress}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-400 font-semibold">
                        {g.completed ? "Complete" : "In Progress"}
                      </p>
                      <p className="text-[9px] text-neutral-605 mt-0.5">Status</p>
                    </div>
                    {g.completed ? (
                      <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    ) : (
                      <Link
                        href="/items/manage"
                        className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-355 hover:text-white rounded-lg text-[10px] font-semibold transition-colors"
                      >
                        Update
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}
