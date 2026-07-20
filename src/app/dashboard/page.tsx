"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  AlertCircle,
  Target,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// ── Types ────────────────────────────────────────────────────────────────────

interface DashboardStats {
  activeTrack: string;
  activeTrackPhase: string;
  totalGoals: number;
  completedGoals: number;
  inProgressGoals: number;
  weeklyActivity: { name: string; hours: number }[];
  totalWeeklyHours: number;
  weekLabel: string;
  mentorQueriesRemaining: number;
  daysUntilReset: number;
  topMilestones: {
    id: string;
    title: string;
    path: string;
    status: "Completed" | "In Progress" | "Pending";
    progress: number;
    dueDate: string;
  }[];
}

// ── Skeleton loaders ─────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="glass-card p-5 space-y-3 rounded-2xl animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-2 w-20 bg-white/[0.06] rounded" />
        <div className="h-4 w-4 bg-white/[0.06] rounded-full" />
      </div>
      <div className="h-4 w-32 bg-white/[0.06] rounded" />
      <div className="h-2 w-24 bg-white/[0.04] rounded" />
    </div>
  );
}

function SkeletonMilestone() {
  return (
    <div className="flex items-start justify-between gap-4 p-3 bg-white/[0.015] border border-white/[0.06] rounded-xl animate-pulse">
      <div className="space-y-2 flex-1">
        <div className="h-3 w-48 bg-white/[0.06] rounded" />
        <div className="h-2 w-32 bg-white/[0.04] rounded" />
      </div>
      <div className="space-y-1.5 flex-shrink-0 text-right">
        <div className="h-4 w-16 bg-white/[0.06] rounded-lg" />
        <div className="h-2 w-12 bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch aggregated stats from backend
  const fetchStats = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to load dashboard data");
      }
      const data: DashboardStats = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, [fetchStats]);

  // ── Status badge helper ────────────────────────────────────────────────────
  const statusBadge = (status: string) => {
    if (status === "Completed")
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    if (status === "In Progress")
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  };

  // ── Progress label ─────────────────────────────────────────────────────────
  const velocityTrend = (hours: number) => {
    if (hours === 0) return { label: "No activity yet this week", color: "text-slate-500" };
    if (hours < 5) return { label: "Getting started — keep going!", color: "text-amber-400" };
    if (hours < 15) return { label: "Good pace this week", color: "text-cyan-400" };
    return { label: "Excellent momentum!", color: "text-emerald-400" };
  };

  const { label: velocityLabel, color: velocityColor } = velocityTrend(
    stats?.totalWeeklyHours ?? 0
  );

  // ── Plan label for mentor balance ──────────────────────────────────────────
  const mentorPlanLabel = user?.role === "admin" ? "Admin plan" : "Standard plan";

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="mx-auto max-w-7xl space-y-8 relative z-10">

          {/* ── Welcome Header ─────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.06] pb-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-blue-400" />
                Engineering Dashboard
              </h1>
              <p className="text-xs text-slate-400">
                Welcome back,{" "}
                <span className="text-white font-semibold">
                  {user?.name || "Developer"}
                </span>
                . Here is your learning trajectory for this week.
              </p>
            </div>
            <div className="flex gap-2 items-center">
              {/* Refresh button */}
              <button
                onClick={() => fetchStats(true)}
                disabled={refreshing}
                title="Refresh dashboard"
                className="h-8 w-8 flex items-center justify-center rounded-xl bg-white/[0.035] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.12] transition-all cursor-pointer disabled:opacity-50 text-slate-400 hover:text-white"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
              </button>
              <Link
                href="/items/add"
                className="btn-primary hover:btn-primary-hover flex items-center gap-1 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                <ListPlus className="h-3.5 w-3.5" />
                Add Learning Goal
              </Link>
            </div>
          </div>

          {/* ── Error Banner ───────────────────────────────────────────────── */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>
                Could not load dashboard data: {error}.{" "}
                <button
                  onClick={() => fetchStats()}
                  className="underline hover:no-underline font-semibold cursor-pointer"
                >
                  Retry
                </button>
              </span>
            </div>
          )}

          {/* ── Quick Metrics Grid ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Active Track */}
            {loading ? (
              <SkeletonCard />
            ) : (
              <div className="glass-card hover:glass-card-hover p-5 space-y-3 transition-all duration-300 rounded-2xl">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                  <span>Active Track</span>
                  <Compass className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  {stats && stats.activeTrack !== "No active track" ? (
                    <>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        {stats.activeTrack}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {stats.activeTrackPhase}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm font-bold text-slate-500">No active track</h3>
                      <p className="text-[10px] text-blue-400 mt-0.5">
                        <Link href="/roadmaps" className="hover:underline">
                          Browse roadmaps →
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Study Velocity */}
            {loading ? (
              <SkeletonCard />
            ) : (
              <div className="glass-card hover:glass-card-hover p-5 space-y-3 transition-all duration-300 rounded-2xl">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                  <span>Study Velocity</span>
                  <Clock className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {stats?.totalWeeklyHours ?? 0} Hours
                  </h3>
                  <p className={`text-[10px] mt-0.5 ${velocityColor}`}>
                    {velocityLabel}
                  </p>
                </div>
              </div>
            )}

            {/* Mentorship Balance */}
            {loading ? (
              <SkeletonCard />
            ) : (
              <div className="glass-card hover:glass-card-hover p-5 space-y-3 transition-all duration-300 rounded-2xl">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                  <span>Mentorship Balance</span>
                  <BrainCircuit className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {stats?.mentorQueriesRemaining ?? 50} Queries Remaining
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Resets in {stats?.daysUntilReset ?? 7} day
                    {stats?.daysUntilReset !== 1 ? "s" : ""} ({mentorPlanLabel})
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Goal Progress Summary ──────────────────────────────────────── */}
          {!loading && stats && stats.totalGoals > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Goals",
                  value: stats.totalGoals,
                  color: "text-white",
                  icon: <Target className="h-3.5 w-3.5 text-blue-400" />,
                },
                {
                  label: "In Progress",
                  value: stats.inProgressGoals,
                  color: "text-cyan-400",
                  icon: <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />,
                },
                {
                  label: "Completed",
                  value: stats.completedGoals,
                  color: "text-emerald-400",
                  icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card rounded-2xl p-4 flex items-center gap-3"
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className={`text-base font-extrabold ${item.color}`}>
                      {item.value}
                    </p>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ── Left: Active Milestones ──────────────────────────────────── */}
            <div className="lg:col-span-6 space-y-6">
              <div className="glass-card p-6 space-y-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Active Milestones
                  </h3>
                  {!loading && stats && (
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      {stats.topMilestones.length} shown
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {loading ? (
                    <>
                      <SkeletonMilestone />
                      <SkeletonMilestone />
                      <SkeletonMilestone />
                    </>
                  ) : stats && stats.topMilestones.length > 0 ? (
                    stats.topMilestones.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-start justify-between gap-4 p-3 bg-white/[0.015] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-colors text-xs"
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-200 truncate">
                            {m.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 truncate">{m.path}</p>
                          {/* Progress bar */}
                          {m.status !== "Completed" && (
                            <div className="flex items-center gap-2 pt-0.5">
                              <div className="w-24 bg-white/[0.04] rounded-full h-1 overflow-hidden border border-white/[0.06]">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${m.progress}%` }}
                                />
                              </div>
                              <span className="text-[9px] text-slate-600 font-semibold">
                                {m.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-right space-y-1 flex-shrink-0">
                          <span
                            className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-lg ${statusBadge(m.status)}`}
                          >
                            {m.status}
                          </span>
                          <p className="text-[9px] text-slate-500">
                            Due: {m.dueDate}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 space-y-2">
                      <BookOpen className="h-7 w-7 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-500">No goals yet.</p>
                      <Link
                        href="/items/add"
                        className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 font-bold transition-colors"
                      >
                        Add your first goal
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
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

            {/* ── Right: Weekly Activity Chart ─────────────────────────────── */}
            <div className="lg:col-span-6">
              <div className="glass-card p-6 space-y-4 rounded-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Weekly Activity (Hours)
                  </h3>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {loading ? "Loading…" : stats?.weekLabel ?? ""}
                  </span>
                </div>

                {/* Graph Body */}
                <div className="h-[210px] w-full text-xs">
                  {loading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                    </div>
                  ) : mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats?.weeklyActivity ?? []}
                        margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.03)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(11, 17, 32, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "12px",
                            backdropFilter: "blur(8px)",
                          }}
                          itemStyle={{ color: "#3b82f6" }}
                          labelStyle={{ color: "#94a3b8", fontSize: "10px" }}
                          formatter={(value) => [
                            `${value ?? 0}h`,
                            "Activity",
                          ]}
                        />
                        <Bar
                          dataKey="hours"
                          fill="url(#barGradient)"
                          radius={[4, 4, 0, 0]}
                        />
                        <defs>
                          <linearGradient
                            id="barGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-600">
                      Loading chart...
                    </div>
                  )}
                </div>

                {/* Activity note */}
                {!loading && stats && stats.totalWeeklyHours === 0 && (
                  <p className="text-[10px] text-slate-600 text-center pb-1">
                    Activity reflects goal interactions this week. Add or update goals to see progress.
                  </p>
                )}

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
