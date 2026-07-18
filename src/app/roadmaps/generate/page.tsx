"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Sparkles, ArrowLeft, ArrowRight, Brain, Settings2, Target, Clock, BookOpen } from "lucide-react";
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
    "Finalizing your custom roadmap layout in MongoDB..."
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

      // Redirect to the newly generated custom roadmap
      router.push(`/roadmaps/${data.id}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500/60 transition-colors";

  return (
    <ProtectedRoute>
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/15 via-neutral-950 to-neutral-950 flex justify-center items-center">
        <div className="w-full max-w-xl">
          
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
                <div className="space-y-4">
                  <Link
                    href="/roadmaps"
                    className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-300 font-semibold"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Explore
                  </Link>
                  <div className="border-b border-neutral-900 pb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Roadmap Forge</h1>
                      <p className="text-xs text-neutral-450 mt-0.5">
                        Design a customized career development curriculum tailored to your specific background and goals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Card */}
                <div className="relative rounded-2xl border border-neutral-900 bg-neutral-900/30 p-6 sm:p-8 backdrop-blur-md space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                    {/* Career Interest */}
                    <div className="space-y-2">
                      <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5 text-neutral-500" />
                        What is your specific career goal or technology interest?
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        placeholder="e.g. Master React Native to build mobile startups, or Learn cloud-native site reliability with AWS & Kubernetes..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Skill level */}
                      <div className="space-y-2">
                        <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
                          <Settings2 className="h-3.5 w-3.5 text-neutral-500" />
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
                        <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-neutral-500" />
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
                        <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-neutral-500" />
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
                        <label className="font-semibold text-neutral-300 flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-neutral-500" />
                          Primary learning focus
                        </label>
                        <select
                          value={focus}
                          onChange={(e) => setFocus(e.target.value)}
                          className={inputClass}
                        >
                          <option>Practical Projects</option>
                          <option>Conceptual Theory</option>
                          <option>SRE & Operations</option>
                          <option>Interview Preparation</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Forge Custom Path
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 space-y-8 flex flex-col items-center justify-center"
              >
                {/* Glowing Spinner */}
                <div className="relative flex items-center justify-center w-24 h-24">
                  <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
                  <Sparkles className="h-8 w-8 text-indigo-400 animate-pulse" />
                </div>

                <div className="space-y-3 max-w-sm">
                  <h3 className="text-sm font-bold text-white tracking-tight">SkillForge AI is mapping your path</h3>
                  
                  {/* Rotating status lines */}
                  <div className="h-10 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStep}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-indigo-400 font-medium"
                      >
                        {loadingTexts[loadingStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  
                  <p className="text-[10px] text-neutral-500 leading-normal">
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
