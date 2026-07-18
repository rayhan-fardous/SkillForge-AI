"use client";

import React from "react";
import { Sparkles, BrainCircuit, ShieldCheck, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="mx-auto max-w-4xl space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Our Mission
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Empowering Modern Self-Directed Learners
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            SkillForge AI was founded on a simple insight: traditional bootcamps are too expensive, and static video tutorials fail to build real debugging capabilities. We bridge this gap using adaptive AI agent models.
          </p>
        </div>

        {/* Core Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-6 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BrainCircuit className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-white">Generative Adaptability</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              No two engineers are the same. Our paths change dynamically based on your constraints, background knowledge, and progression speed.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-6 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-white">Instant Feedback Loops</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Waiting days for project grades kills motivation. Our automated testing engine reviews commits and returns code metrics in seconds.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-6 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-white">Production Focus</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We focus purely on production tools: Kubernetes configs, Redis queues, and state synchronization, rather than simple checklist items.
            </p>
          </div>
        </div>

        {/* Crew Info */}
        <div className="space-y-6">
          <div className="flex gap-2 items-center text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            <Users className="h-4.5 w-4.5 text-indigo-400" />
            <span>Behind the Forge</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            We are a group of educators, site reliability experts, and machine learning researchers. Having trained developers at top tech startups and large corporations, we engineered SkillForge AI to scale high-quality mentorship to anyone with a browser and a terminal.
          </p>
        </div>

      </div>
    </div>
  );
}
