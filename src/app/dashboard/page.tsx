"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  LayoutDashboard,
  TrendingUp,
  Clock,
  Compass,
  ArrowRight,
  CheckCircle2,
  ListPlus,
  BrainCircuit,
  AlertCircle
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const weeklyActivityData = [
    { name: "Mon", hours: 1.8 },
    { name: "Tue", hours: 2.4 },
    { name: "Wed", hours: 3.2 },
    { name: "Thu", hours: 1.5 },
    { name: "Fri", hours: 2.8 },
    { name: "Sat", hours: 4.5 },
    { name: "Sun", hours: 3.0 },
  ];

  const currentMilestones = [
    {
      title: "Dockerize Complex Next.js App",
      path: "DevOps & SRE Engineer Path",
      status: "In Progress",
      estTime: "3h remaining",
    },
    {
      title: "Write Kubernetes Pod Manifests",
      path: "DevOps & SRE Engineer Path",
      status: "Pending Checkpoint",
      estTime: "1h estimated",
    },
    {
      title: "Git Hooks for Auto Linting",
      path: "DevOps & SRE Engineer Path",
      status: "Completed",
      estTime: "Finished yesterday",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-indigo-400" />
                Engineering Dashboard
              </h1>
              <p className="text-xs text-neutral-400">
                Welcome back, {user?.name || "Developer"}. Here is your learning trajectory for this week.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/items/add"
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ListPlus className="h-3.5 w-3.5" />
                Add Learning Goal
              </Link>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-5 space-y-3">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase">
                <span>Active Track</span>
                <Compass className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">DevOps & SRE Engineer</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">Phase 2: Containers & Kubernetes</p>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-5 space-y-3">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase">
                <span>Study Velocity</span>
                <Clock className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">19.2 Hours</h3>
                <p className="text-[10px] text-emerald-400 mt-0.5">On track (+15% vs last week)</p>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-5 space-y-3">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase">
                <span>Mentorship Balance</span>
                <BrainCircuit className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">42 Queries Remaining</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">Resets in 4 days (Premium plan)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Milestones Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-xl border border-neutral-900 bg-neutral-900/30 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Active Milestones
                </h3>

                <div className="space-y-3">
                  {currentMilestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-4 p-3 bg-neutral-950 border border-neutral-900 rounded-lg hover:border-neutral-800 transition-colors text-xs"
                    >
                      <div className="space-y-1">
                        <h4 className="font-semibold text-neutral-200">{m.title}</h4>
                        <p className="text-[10px] text-neutral-500">{m.path}</p>
                      </div>
                      <div className="text-right space-y-1 flex-shrink-0">
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded ${
                          m.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : m.status === "In Progress"
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}>
                          {m.status}
                        </span>
                        <p className="text-[9px] text-neutral-500">{m.estTime}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/learning-goals"
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider transition-colors"
                  >
                    Manage Learning Goals
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Recharts Weekly Velocity Activity */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-neutral-900 bg-neutral-900/30 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Weekly Activity (Hours)
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-semibold">July 12 - July 18</span>
                </div>

                {/* Graph Body */}
                <div className="h-[210px] w-full text-xs">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                        <XAxis dataKey="name" stroke="#525252" fontSize={10} tickLine={false} />
                        <YAxis stroke="#525252" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #262626", borderRadius: "8px" }}
                          itemStyle={{ color: "#818cf8" }}
                          labelStyle={{ color: "#a3a3a3", fontSize: "10px" }}
                        />
                        <Bar dataKey="hours" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-neutral-600">
                      Loading chart components...
                    </div>
                  )}
                </div>

                <div className="pt-2 text-center border-t border-neutral-900/50">
                  <Link
                    href="/analytics"
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider transition-colors"
                  >
                    View Detailed AI Analytics
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
