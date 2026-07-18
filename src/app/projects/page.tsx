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
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium">
            <Briefcase className="h-3.5 w-3.5" />
            Hands-on Portfolio Builders
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Capstone Engineering Projects
          </h1>
          <p className="text-sm text-neutral-400">
            Build actual code projects that matter. Connect them to your roadmaps, submit GitHub repositories, and get instantly evaluated by our AI reviewing agent.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-neutral-900 pb-6">
          {/* Difficulty Tabs */}
          <div className="flex gap-1.5">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  diffFilter === d
                    ? "bg-cyan-600 text-white animate-pulse"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or title..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>

        {/* Grid Display */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 flex flex-col justify-between hover:border-cyan-500/30 hover:bg-neutral-900/50 transition-all duration-300 shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.difficulty === "Hard"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : p.difficulty === "Medium"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {p.difficulty}
                    </span>
                    <div className="flex gap-2 items-center text-[10px] text-neutral-500 font-semibold">
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3 text-neutral-600" />
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
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2.5">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.stack.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-neutral-950 border border-neutral-900 rounded px-2 py-0.5 text-[9px] font-medium text-neutral-500"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-900/50 mt-6">
                  <Link
                    href="/register"
                    className="w-full inline-flex justify-center items-center gap-1.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
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
            <div className="h-10 w-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-300">No Projects Found</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
                Try modifying your technology tag keyword or select a different difficulty filter.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
