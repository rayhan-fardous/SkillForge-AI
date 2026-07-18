"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FolderKanban, ArrowLeft, Trash2, CheckSquare, Square, CheckCircle } from "lucide-react";

export default function ManageGoalsPage() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Master Kubernetes Scaling and Pod Architectures", completed: false },
    { id: 2, title: "Integrate Vector Store Indexing with Pinecone", completed: false },
    { id: 3, title: "Write Multi-stage Docker Builds for Web Apps", completed: true },
  ]);

  const toggleComplete = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
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
                <FolderKanban className="h-5 w-5 text-indigo-400" />
                Manage Goals
              </h1>
              <p className="text-xs text-neutral-400">
                Mark active objectives as complete, configure milestone structures, or remove obsolete tags.
              </p>
            </div>
          </div>

          {/* Goals List Card */}
          <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-6 space-y-4">
            {goals.length > 0 ? (
              <div className="space-y-3">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between gap-4 p-3 bg-neutral-950 border border-neutral-900 rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleComplete(g.id)}
                        className="text-neutral-500 hover:text-indigo-400 transition-colors cursor-pointer"
                      >
                        {g.completed ? (
                          <CheckSquare className="h-4.5 w-4.5 text-indigo-400" />
                        ) : (
                          <Square className="h-4.5 w-4.5" />
                        )}
                      </button>
                      <span className={`font-semibold ${g.completed ? "text-neutral-500 line-through" : "text-neutral-200"}`}>
                        {g.title}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteGoal(g.id)}
                      className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 space-y-2 text-neutral-500">
                <p>No learning goals left. Forge a new one!</p>
                <Link
                  href="/items/add"
                  className="inline-block text-xs text-indigo-400 font-semibold"
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
