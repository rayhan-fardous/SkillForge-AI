"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  PlusCircle,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Brain,
  Target,
  Settings2,
  Clock,
  BookOpen,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ── Tab type ──────────────────────────────────────────────────────────────────
type Tab = "manual" | "ai";

// ── Loading animation texts ───────────────────────────────────────────────────
const AI_LOADING_TEXTS = [
  "Analyzing your career goals...",
  "Curating beginner → advanced skill sets...",
  "Structuring step-by-step milestones...",
  "Designing project checkpoints...",
  "Selecting documentation & resources...",
  "Finalizing your roadmap in the database...",
];

export default function AddGoalPage() {
  const router = useRouter();

  // ── Active tab ───────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>("manual");

  // ── Manual goal state ────────────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("Custom Objective");
  const [dueDate, setDueDate] = useState("");
  const [manualLoading, setManualLoading] = useState(false);
  const [manualSuccess, setManualSuccess] = useState(false);
  const [manualError, setManualError] = useState("");

  // ── AI roadmap state ─────────────────────────────────────────────────────────
  const [interest, setInterest] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [commitment, setCommitment] = useState("10-20 hours/week");
  const [duration, setDuration] = useState("3-6 Months");
  const [focus, setFocus] = useState("Practical Projects");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLoadingStep, setAiLoadingStep] = useState(0);
  const [aiError, setAiError] = useState("");

  // Rotate loading text during AI generation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (aiLoading) {
      interval = setInterval(() => {
        setAiLoadingStep((prev) =>
          prev < AI_LOADING_TEXTS.length - 1 ? prev + 1 : prev
        );
      }, 2800);
    } else {
      setAiLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [aiLoading]);

  // ── Submit manual goal ───────────────────────────────────────────────────────
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setManualLoading(true);
    setManualError("");
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), source, dueDate }),
      });
      if (!res.ok) throw new Error("Failed to create goal");
      setManualSuccess(true);
      setTimeout(() => router.push("/learning-goals"), 1500);
    } catch {
      setManualError("Could not create goal. Please try again.");
    } finally {
      setManualLoading(false);
    }
  };

  // ── Submit AI roadmap generation ─────────────────────────────────────────────
  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interest.trim()) return;
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/roadmaps/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interest, difficulty, commitment, duration, focus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      router.push(`/roadmaps/${data.id}`);
    } catch (err: any) {
      setAiError(err.message || "An unexpected error occurred.");
      setAiLoading(false);
    }
  };

  // ── Shared class strings ─────────────────────────────────────────────────────
  const inputCls = "w-full input-glass focus:input-glass-focus px-3.5 py-2.5 text-xs";
  const labelCls = "font-semibold text-slate-400 text-[10px] uppercase tracking-wider flex items-center gap-1.5";

  return (
    <ProtectedRoute>
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-1/4 w-80 h-64 bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 left-1/4 w-64 h-56 bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-xl space-y-6 relative z-10">

          {/* ── Back link + Header ─────────────────────────────────────────── */}
          <div className="space-y-5">
            <Link
              href="/learning-goals"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 font-semibold transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Goals
            </Link>
            <div className="border-b border-white/[0.06] pb-5">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-blue-400" />
                Add Learning Goal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Create a custom milestone manually, or let AI generate a full personalized roadmap for you.
              </p>
            </div>
          </div>

          {/* ── Tab switcher ───────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            {/* Manual tab */}
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "manual"
                  ? "bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white shadow-[0_2px_12px_rgba(59,130,246,0.25)] border border-blue-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              }`}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Manual Goal
            </button>

            {/* AI Roadmap tab */}
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "ai"
                  ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-[0_2px_12px_rgba(139,92,246,0.25)] border border-purple-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Generate AI Roadmap
            </button>
          </div>

          {/* ── PANEL: Manual Goal ─────────────────────────────────────────── */}
          {activeTab === "manual" && (
            <div className="glass-card rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

              {manualSuccess ? (
                <div className="p-8 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_16px_rgba(16,185,129,0.2)]">
                    <CheckCircle className="h-6 w-6 animate-bounce" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Goal Created!</h3>
                  <p className="text-xs text-slate-500">Redirecting to your goals list…</p>
                </div>
              ) : (
                <form onSubmit={handleManualSubmit} className="p-6 sm:p-8 space-y-5">
                  {manualError && (
                    <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-xs px-3.5 py-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                      {manualError}
                    </div>
                  )}

                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className={labelCls}>
                      <Target className="h-3.5 w-3.5 text-blue-400" />
                      Goal / Objective Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Master Prometheus Observability Dashboards"
                      className={inputCls}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Source */}
                    <div className="space-y-1.5">
                      <label className={labelCls}>
                        <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                        Goal Source Type
                      </label>
                      <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className={inputCls}
                      >
                        <option>Custom Objective</option>
                        <option>AI Engineer Path</option>
                        <option>DevOps & SRE Track</option>
                        <option>Frontend Engineering</option>
                        <option>Backend Development</option>
                        <option>Data Science</option>
                        <option>Cyber Security</option>
                      </select>
                    </div>

                    {/* Due date */}
                    <div className="space-y-1.5">
                      <label className={labelCls}>
                        <Clock className="h-3.5 w-3.5 text-blue-400" />
                        Target Date
                      </label>
                      <input
                        type="date"
                        required
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={manualLoading}
                      className="w-full btn-primary hover:btn-primary-hover text-white font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {manualLoading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Creating…
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-3.5 w-3.5" />
                          Forge New Goal
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ── PANEL: AI Roadmap Generator ────────────────────────────────── */}
          {activeTab === "ai" && (
            <div className="glass-card rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              {aiLoading ? (
                /* ── AI Loading screen ──────────────────────────────────────── */
                <div className="p-10 text-center flex flex-col items-center justify-center space-y-8">
                  {/* Spinner */}
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <div className="absolute inset-0 border-4 border-purple-500/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-purple-500 border-r-blue-500/50 rounded-full animate-spin" />
                    <div className="absolute inset-4 border-2 border-purple-500/10 rounded-full" />
                    <div
                      className="absolute inset-4 border-2 border-t-blue-400/60 rounded-full animate-spin"
                      style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
                    />
                    <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
                  </div>

                  <div className="space-y-3 max-w-xs">
                    <h3 className="text-sm font-bold text-white">SkillForge AI is mapping your path</h3>

                    {/* Rotating status text */}
                    <div className="h-8 flex items-center justify-center">
                      <p
                        key={aiLoadingStep}
                        className="text-xs text-purple-400 font-medium transition-opacity duration-300"
                      >
                        {AI_LOADING_TEXTS[aiLoadingStep]}
                      </p>
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center justify-center gap-1.5">
                      {AI_LOADING_TEXTS.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            i <= aiLoadingStep
                              ? "w-5 bg-purple-500"
                              : "w-1.5 bg-white/[0.08]"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Takes ~10–15 seconds. Gemini AI structures milestones and saves the roadmap to your account.
                    </p>
                  </div>
                </div>
              ) : (
                /* ── AI Form ────────────────────────────────────────────────── */
                <form onSubmit={handleAiSubmit} className="p-6 sm:p-8 space-y-5">

                  {/* AI badge */}
                  <div className="flex items-center gap-3 pb-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_16px_rgba(139,92,246,0.15)] flex-shrink-0">
                      <Brain className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">AI Roadmap Forge</p>
                      <p className="text-[10px] text-slate-500">Powered by Gemini — generates a full personalized curriculum</p>
                    </div>
                  </div>

                  {aiError && (
                    <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-xs px-3.5 py-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                      {aiError}
                    </div>
                  )}

                  {/* Career interest */}
                  <div className="space-y-1.5">
                    <label className={labelCls}>
                      <Target className="h-3.5 w-3.5 text-purple-400" />
                      Your career goal or technology interest
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      placeholder="e.g. Master React Native to build mobile startups, or Learn cloud-native site reliability with AWS & Kubernetes..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Skill level */}
                    <div className="space-y-1.5">
                      <label className={labelCls}>
                        <Settings2 className="h-3.5 w-3.5 text-purple-400" />
                        Difficulty level
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className={inputCls}
                      >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>

                    {/* Time commitment */}
                    <div className="space-y-1.5">
                      <label className={labelCls}>
                        <Clock className="h-3.5 w-3.5 text-purple-400" />
                        Time commitment
                      </label>
                      <select
                        value={commitment}
                        onChange={(e) => setCommitment(e.target.value)}
                        className={inputCls}
                      >
                        <option>5-10 hours/week</option>
                        <option>10-20 hours/week</option>
                        <option>20-30 hours/week</option>
                        <option>Full-time commitment</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Duration */}
                    <div className="space-y-1.5">
                      <label className={labelCls}>
                        <Clock className="h-3.5 w-3.5 text-purple-400" />
                        Expected duration
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className={inputCls}
                      >
                        <option>1-3 Months</option>
                        <option>3-6 Months</option>
                        <option>6-12 Months</option>
                      </select>
                    </div>

                    {/* Focus area */}
                    <div className="space-y-1.5">
                      <label className={labelCls}>
                        <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                        Primary learning focus
                      </label>
                      <select
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        className={inputCls}
                      >
                        <option>Practical Projects</option>
                        <option>Conceptual Theory</option>
                        <option>SRE & Operations</option>
                        <option>Interview Preparation</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-1 space-y-2">
                    <button
                      type="submit"
                      className="w-full text-white font-bold text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
                        boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = "0.9";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = "1";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Generate AI Roadmap
                    </button>
                    <p className="text-center text-[10px] text-slate-600">
                      The generated roadmap will be saved to your account and opened immediately.
                    </p>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ── Footer hint ────────────────────────────────────────────────── */}
          {!aiLoading && !manualSuccess && (
            <div className="flex items-center justify-between text-[10px] text-slate-600">
              <span>
                {activeTab === "manual"
                  ? "Want a full AI-generated curriculum?"
                  : "Just need a quick single milestone?"}
              </span>
              <button
                onClick={() => setActiveTab(activeTab === "manual" ? "ai" : "manual")}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
              >
                {activeTab === "manual" ? "Try AI Roadmap" : "Manual Goal"}
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}
