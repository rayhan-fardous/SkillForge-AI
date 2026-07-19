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
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="mx-auto max-w-7xl space-y-8 relative z-10">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.06] pb-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-blue-400" />
                Engineering Dashboard
              </h1>
              <p className="text-xs text-slate-400">
                Welcome back, {user?.name || "Developer"}. Here is your learning trajectory for this week.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/items/add"
                className="btn-primary hover:btn-primary-hover flex items-center gap-1 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                <ListPlus className="h-3.5 w-3.5" />
                Add Learning Goal
              </Link>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-card hover:glass-card-hover p-5 space-y-3 transition-all duration-300 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Active Track</span>
                <Compass className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">DevOps & SRE Engineer</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Phase 2: Containers & Kubernetes</p>
              </div>
            </div>

            <div className="glass-card hover:glass-card-hover p-5 space-y-3 transition-all duration-300 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Study Velocity</span>
                <Clock className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">19.2 Hours</h3>
                <p className="text-[10px] text-emerald-400 mt-0.5">On track (+15% vs last week)</p>
              </div>
            </div>

            <div className="glass-card hover:glass-card-hover p-5 space-y-3 transition-all duration-300 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Mentorship Balance</span>
                <BrainCircuit className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">42 Queries Remaining</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Resets in 4 days (Premium plan)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Milestones Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div className="glass-card p-6 space-y-4 rounded-2xl">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Active Milestones
                </h3>

                <div className="space-y-3">
                  {currentMilestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-4 p-3 bg-white/[0.015] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-colors text-xs"
                    >
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-200">{m.title}</h4>
                        <p className="text-[10px] text-slate-500">{m.path}</p>
                      </div>
                      <div className="text-right space-y-1 flex-shrink-0">
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-lg ${
                          m.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : m.status === "In Progress"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {m.status}
                        </span>
                        <p className="text-[9px] text-slate-500">{m.estTime}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/learning-goals"
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors"
                  >
                    Manage Learning Goals
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Recharts Weekly Velocity Activity */}
            <div className="lg:col-span-6">
              <div className="glass-card p-6 space-y-4 rounded-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Weekly Activity (Hours)
                  </h3>
                  <span className="text-[10px] text-slate-500 font-semibold">July 12 - July 18</span>
                </div>

                {/* Graph Body */}
                <div className="h-[210px] w-full text-xs">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "rgba(11, 17, 32, 0.9)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", backdropFilter: "blur(8px)" }}
                          itemStyle={{ color: "#3b82f6" }}
                          labelStyle={{ color: "#94a3b8", fontSize: "10px" }}
                        />
                        <Bar dataKey="hours" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-600">
                      Loading chart components...
                    </div>
                  )}
                </div>

                <div className="pt-2 text-center border-t border-white/[0.05]">
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
