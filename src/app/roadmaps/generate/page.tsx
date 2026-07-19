"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Sparkles, ArrowLeft, Brain, Settings2, Target, Clock, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GenerateRoadmapPage() {
  const router = useRouter();
  const [interest, setInterest] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [commitment, setCommitment] = useState("10-20 hours/week");
  const [duration, setDuration] = useState("3-6 Months");
  const [focus, setFocus] = useState("Practical Projects");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");

  const loadingTexts = [
    "Analyzing your unique career goals...",
    "Curating beginner, intermediate, and advanced skill sets...",
    "Structuring step-by-step chronological roadmap milestones...",
    "Designing custom project checkpoints with tech stacks...",
    "Selecting official learning references and documentation...",
    "Finalizing your custom roadmap layout in MongoDB...",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
      }, 3000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interest.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/roadmaps/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interest, difficulty, commitment, duration, focus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed. Please try again.");
      }

      router.push(`/roadmaps/${data.id}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const inputClass = "w-full input-glass focus:input-glass-focus px-4 py-3";
  const labelClass = "font-semibold text-slate-300 text-xs flex items-center gap-1.5";

  return (
    <ProtectedRoute>
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden flex justify-center items-center min-h-[80vh]">
        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-xl relative z-10">

          <AnimatePresence mode="wait">
            {!isLoading ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Back link and Header */}
                <div className="space-y-5">
                  <Link
                    href="/roadmaps"
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 font-semibold transition-colors group"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Explore
                  </Link>
                  <div className="border-b border-white/[0.06] pb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex-shrink-0">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Roadmap Forge</h1>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Design a customized career development curriculum tailored to your specific background and goals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Card */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                  {/* Top glow accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                    {/* Career Interest */}
                    <div className="space-y-2">
                      <label className={labelClass}>
                        <Target className="h-3.5 w-3.5 text-blue-400" />
                        What is your specific career goal or technology interest?
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        placeholder="e.g. Master React Native to build mobile startups, or Learn cloud-native site reliability with AWS & Kubernetes..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Skill level */}
                      <div className="space-y-2">
                        <label className={labelClass}>
                          <Settings2 className="h-3.5 w-3.5 text-blue-400" />
                          Difficulty level
                        </label>
                        <select
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className={inputClass}
                        >
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>

                      {/* Commitment */}
                      <div className="space-y-2">
                        <label className={labelClass}>
                          <Clock className="h-3.5 w-3.5 text-blue-400" />
                          Time commitment
                        </label>
                        <select
                          value={commitment}
                          onChange={(e) => setCommitment(e.target.value)}
                          className={inputClass}
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
                      <div className="space-y-2">
                        <label className={labelClass}>
                          <Clock className="h-3.5 w-3.5 text-blue-400" />
                          Expected duration
                        </label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className={inputClass}
                        >
                          <option>1-3 Months</option>
                          <option>3-6 Months</option>
                          <option>6-12 Months</option>
                        </select>
                      </div>

                      {/* Focus Area */}
                      <div className="space-y-2">
                        <label className={labelClass}>
                          <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                          Primary learning focus
                        </label>
                        <select
                          value={focus}
                          onChange={(e) => setFocus(e.target.value)}
                          className={inputClass}
                        >
                          <option>Practical Projects</option>
                          <option>Conceptual Theory</option>
                          <option>SRE &amp; Operations</option>
                          <option>Interview Preparation</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full btn-primary hover:btn-primary-hover text-white font-semibold text-xs py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Forge Custom Path
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 space-y-10 flex flex-col items-center justify-center"
              >
                {/* Glowing Spinner */}
                <div className="relative flex items-center justify-center w-28 h-28">
                  <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-blue-500 border-r-cyan-500/50 rounded-full animate-spin" />
                  <div className="absolute inset-4 border-2 border-blue-500/10 rounded-full" />
                  <div className="absolute inset-4 border-2 border-t-cyan-400/60 rounded-full animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
                  <Sparkles className="h-7 w-7 text-blue-400 animate-pulse" />
                </div>

                <div className="space-y-4 max-w-sm">
                  <h3 className="text-sm font-bold text-white tracking-tight">SkillForge AI is mapping your path</h3>

                  {/* Rotating status lines */}
                  <div className="h-10 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStep}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-blue-400 font-medium"
                      >
                        {loadingTexts[loadingStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Progress dots */}
                  <div className="flex items-center justify-center gap-1.5">
                    {loadingTexts.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i <= loadingStep
                            ? "w-6 bg-blue-500"
                            : "w-1.5 bg-white/[0.08]"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-500 leading-normal">
                    This will take around 10-15 seconds. We connect vector models and organize learning milestones with MongoDB schemas.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </ProtectedRoute>
  );
}
