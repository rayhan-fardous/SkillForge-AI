"use client";

import React from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BookOpen, ListPlus, FolderKanban, Plus, Clock, CheckCircle } from "lucide-react";

export default function LearningGoalsPage() {
  const activeGoals = [
    {
      id: 1,
      title: "Master Kubernetes Scaling and Pod Architectures",
      source: "Self-Defined Objective",
      progress: 60,
      milestones: "3 of 5 complete",
      dueDate: "Aug 10, 2026",
    },
    {
      id: 2,
      title: "Integrate Vector Store Indexing with Pinecone",
      source: "AI Engineer Path",
      progress: 20,
      milestones: "1 of 5 complete",
      dueDate: "Aug 28, 2026",
    },
    {
      id: 3,
      title: "Write Multi-stage Docker Builds for Web Apps",
      source: "DevOps & SRE Track",
      progress: 100,
      milestones: "4 of 4 complete",
      dueDate: "Completed",
    },
  ];

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
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <FolderKanban className="h-3.5 w-3.5" />
                Manage
              </Link>
            </div>
          </div>

          {/* Active Goals Grid */}
          <div className="space-y-4">
            {activeGoals.map((g) => (
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
                    <p className="text-[10px] text-neutral-400 font-semibold">{g.milestones}</p>
                    <p className="text-[9px] text-neutral-600 mt-0.5">Active Checklist</p>
                  </div>
                  {g.progress === 100 ? (
                    <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  ) : (
                    <Link
                      href="/items/manage"
                      className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-350 hover:text-white rounded-lg text-[10px] font-semibold transition-colors"
                    >
                      Update
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
