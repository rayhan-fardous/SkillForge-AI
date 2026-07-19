"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, Clock, Award, Star, Search, ShieldAlert, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");

  const projects = [
    {
      title: "Design a Distributed Chat Server",
      difficulty: "Hard",
      estHours: "24h",
      score: "96%",
      stack: ["WebSockets", "Node.js", "Redis PubSub", "Docker"],
      description: "Build a highly scalable real-time chat service capable of handling 10k concurrent connections with state persistence.",
    },
    {
      title: "AI RAG Document Summarizer",
      difficulty: "Medium",
      estHours: "18h",
      score: "92%",
      stack: ["Next.js", "LangChain", "Pinecone DB", "OpenAI API"],
      description: "Implement a semantic PDF parsing and retrieval engine that answers user queries based on uploaded context documents.",
    },
    {
      title: "Kubernetes GitOps Deployment Pipeline",
      difficulty: "Hard",
      estHours: "30h",
      score: "98%",
      stack: ["Kubernetes", "ArgoCD", "GitHub Actions", "Helm"],
      description: "Establish a fully automated continuous deployment pipeline deploying localized microservices to a local K8s cluster on git push.",
    },
    {
      title: "Task Management API with JWT Auth",
      difficulty: "Easy",
      estHours: "8h",
      score: "90%",
      stack: ["Express.js", "MongoDB", "JWT", "TypeScript"],
      description: "Develop a basic task resource system exposing secured CRUD endpoints, custom middleware validation, and role access.",
    },
    {
      title: "Real-time Traffic Monitoring Dashboard",
      difficulty: "Medium",
      estHours: "16h",
      score: "94%",
      stack: ["React", "Tailwind CSS", "Recharts", "SSE Protocol"],
      description: "Build a visual browser interface streaming fake sensor analytics over Server-Sent Events with responsive charts.",
    },
    {
      title: "Distributed Key-Value Store",
      difficulty: "Hard",
      estHours: "40h",
      score: "99%",
      stack: ["Go", "Raft Consensus", "gRPC", "Protobuf"],
      description: "Code a consensus-based local server cluster that coordinates cache replication and resolves split-brain conflicts.",
    },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDiff = diffFilter === "All" || p.difficulty === diffFilter;

    return matchesSearch && matchesDiff;
  });

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-80 bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium shadow-[0_0_10px_rgba(6,182,212,0.08)]">
            <Briefcase className="h-3.5 w-3.5" />
            Hands-on Portfolio Builders
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Capstone Engineering Projects
          </h1>
          <p className="text-sm text-slate-400">
            Build actual code projects that matter. Connect them to your roadmaps, submit GitHub repositories, and get instantly evaluated by our AI reviewing agent.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/[0.06] pb-6">
          {/* Difficulty Tabs */}
          <div className="flex gap-1.5">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  diffFilter === d
                    ? "btn-primary text-white shadow-lg scale-105"
                    : "btn-secondary hover:btn-secondary-hover"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or title..."
              className="w-full input-glass focus:input-glass-focus pl-9 pr-4 py-2"
            />
          </div>
        </div>

        {/* Grid Display */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, idx) => (
              <div
                key={idx}
                className="group glass-card hover:glass-card-hover p-6 flex flex-col justify-between rounded-2xl transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                      p.difficulty === "Hard"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : p.difficulty === "Medium"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}>
                      {p.difficulty}
                    </span>
                    <div className="flex gap-2 items-center text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3 text-slate-600" />
                        {p.estHours}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <Award className="h-3 w-3" />
                        {p.score} Score
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.stack.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-white/[0.03] border border-white/[0.07] rounded-lg px-2 py-0.5 text-[9px] font-medium text-slate-500"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.05] mt-6">
                  <Link
                    href="/register"
                    className="w-full btn-secondary hover:btn-secondary-hover inline-flex justify-center items-center gap-1.5 text-slate-200 text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Start Project
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-500 mx-auto">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-300">No Projects Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                Try modifying your technology tag keyword or select a different difficulty filter.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
