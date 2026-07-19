"use client";

import React from "react";
import { Sparkles, BrainCircuit, ShieldCheck, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl space-y-20 relative z-10">

        {/* Header */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium shadow-[0_0_12px_rgba(59,130,246,0.1)]">
            <Sparkles className="h-3.5 w-3.5" />
            Our Mission
          </div>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Empowering Modern{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Self-Directed Learners
            </span>
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            SkillForge AI was founded on a simple insight: traditional bootcamps are too expensive, and static video tutorials fail to build real debugging capabilities. We bridge this gap using adaptive AI agent models.
          </p>
        </div>

        {/* Core Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card hover:glass-card-hover p-6 space-y-4 rounded-2xl transition-all duration-300 group">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Generative Adaptability</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No two engineers are the same. Our paths change dynamically based on your constraints, background knowledge, and progression speed.
            </p>
          </div>

          <div className="glass-card hover:glass-card-hover p-6 space-y-4 rounded-2xl transition-all duration-300 group">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Instant Feedback Loops</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Waiting days for project grades kills motivation. Our automated testing engine reviews commits and returns code metrics in seconds.
            </p>
          </div>

          <div className="glass-card hover:glass-card-hover p-6 space-y-4 rounded-2xl transition-all duration-300 group">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Production Focus</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We focus purely on production tools: Kubernetes configs, Redis queues, and state synchronization, rather than simple checklist items.
            </p>
          </div>
        </div>

        {/* Behind the Forge */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <div className="flex gap-2 items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Users className="h-4 w-4 text-blue-400" />
            <span>Behind the Forge</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            We are a group of educators, site reliability experts, and machine learning researchers. Having trained developers at top tech startups and large corporations, we engineered SkillForge AI to scale high-quality mentorship to anyone with a browser and a terminal.
          </p>
        </div>

      </div>
    </div>
  );
}
