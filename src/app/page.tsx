"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Briefcase,
  Cpu,
  TrendingUp,
  BrainCircuit,
  Terminal,
  Activity,
  Code2,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Award,
  BookOpen,
  Mail,
  Zap,
  Users,
  Search
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 1. Featured Careers (from catalog)
  const featuredCareers = [
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
      desc: "Create responsive client-side visual interfaces, manage application states, and optimize asset distribution pipelines.",
      duration: "4 Months",
      difficulty: "Medium",
      salary: "$115,000",
      rating: "4.8",
    },
    {
      id: "ai-engineer",
      title: "AI Engineer",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
      desc: "Integrate vector databases, establish context-aware retrieval chains (RAG), and fine-tune transformer models.",
      duration: "6 Months",
      difficulty: "Hard",
      salary: "$145,000",
      rating: "4.9",
    },
    {
      id: "backend-developer",
      title: "Backend Developer",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
      desc: "Architect RESTful services, construct relational caches, coordinate distributed message systems, and manage DBs.",
      duration: "5 Months",
      difficulty: "Medium",
      salary: "$120,000",
      rating: "4.7",
    },
  ];

  // 2. AI Features list
  const aiFeatures = [
    {
      title: "Discover Career Paths",
      icon: Compass,
      desc: "Analyze your raw capabilities, previous skill logs, and preference criteria to match you with matching tech fields.",
    },
    {
      title: "Generate Roadmaps",
      icon: BrainCircuit,
      desc: "Forges step-by-step milestones automatically mapping from introductory syntax up to cloud orchestrations.",
    },
    {
      title: "AI Project Recommendations",
      icon: Briefcase,
      desc: "Injects hand-picked code challenges corresponding directly to active lessons with automatic grading checks.",
    },
    {
      title: "Track Learning Progress",
      icon: Activity,
      desc: "Watch real-time speed indexes and milestone validations update automatically based on git commit parsing.",
    },
    {
      title: "Analyze Strengths & Weaknesses",
      icon: Award,
      desc: "Exposes automated reports summarizing code quality scores, performance vulnerabilities, and logical gaps.",
    },
    {
      title: "Chat with AI Mentor",
      icon: MessageSquare,
      desc: "A highly specialized 24/7 technical LLM answering configuration bugs, design patterns, and code edits.",
    },
  ];

  // 3. Roadmap Milestone previews
  const timelineMilestones = [
    { phase: "Foundations", name: "Modern Syntaxes & Git Branching", duration: "Weeks 1-4" },
    { phase: "Core Stack", name: "State Stores, Routing, & Framework APIs", duration: "Weeks 5-12" },
    { phase: "Production Pipelines", name: "Deployments, Containers, & Observability", duration: "Weeks 13-18" },
    { phase: "Capstone Checkpoint", name: "AI Graded Project Code Review", duration: "Weeks 19-24" },
  ];

  // 4. Success stats
  const successStats = [
    { value: "95%", label: "Alumni Job Landing Rate" },
    { value: "25,000+", label: "Active Platform Developers" },
    { value: "1.2M+", label: "Checked Milestone Operations" },
    { value: "4.9/5", label: "Average Student Review Score" },
  ];

  // 5. Testimonials
  const testimonials = [
    {
      name: "Sarah Lin",
      role: "DevOps Engineer @ Stripe",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      text: "The custom Kubernetes and Docker roadmap matched corporate expectations perfectly. I submitted my chat repository, got a 98% AI review score, and showed it to hiring leads. Got the job!",
    },
    {
      name: "Marcus Finch",
      role: "AI Developer @ Vercel",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      text: "Having the AI Mentor available 24/7 inside the editor context saved me hours. It explained vector indices and RAG configuration boundaries clearly without typical search crawler noise.",
    },
  ];

  // 6. Blogs
  const blogs = [
    {
      title: "Why Traditional Coding Tutorials Are Slowing You Down",
      date: "July 12, 2026",
      readTime: "5 min read",
      desc: "Static tutorials create a false sense of progression. Learn why dynamic project challenges integrated with AI code assessments compress learning velocity by 3x.",
    },
    {
      title: "Mastering Next.js 16 Server Components & Data Architecture",
      date: "June 28, 2026",
      readTime: "8 min read",
      desc: "Explore details of rendering boundaries, async data fetches inside layouts, client context bridges, and minimizing bundle weights in large production systems.",
    },
  ];

  // 7. FAQ Data
  const faqData = [
    {
      q: "How does the AI generate learning roadmaps?",
      a: "Our AI model analyzes your career aspirations, current skill level, daily time commitment, and industry demand. It cross-references millions of active developer profiles and open job listings to output a highly personalized roadmap consisting of progressive milestones, curated resources, and hands-on projects.",
    },
    {
      q: "What is the AI Project Evaluation?",
      a: "When you complete a project, you upload your codebase or link a GitHub repository. Our AI agent compiles the code, performs static analysis, runs checks on code quality, security vulnerabilities, architectural patterns, and gives you a score with inline feedback, mimicking a senior developer's code review.",
    },
    {
      q: "How does the AI Mentor help me daily?",
      a: "The AI Mentor is a highly specialized LLM trained on documentation, system design patterns, and engineering best practices. It's available 24/7 inside your editor/dashboard. You can ask it to explain concepts, refactor code snippets, debug errors, or practice system design interviews.",
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterSubscribed(true);
    setEmail("");
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <div className="flex flex-col w-full bg-neutral-950 text-neutral-100 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-28 md:pt-36 md:pb-40 border-b border-neutral-900 bg-radial-[at_50%_0%] from-indigo-950/20 via-neutral-950 to-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Sparkle Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            SkillForge AI - Your AI Career Mentor & Learning Roadmap Assistant
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-[1.1]"
          >
            Forge Your Career Path. <br className="hidden sm:inline" />
            Guided by <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">Agentic AI</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed"
          >
            Discover career tracks, generate customized study checklists, build AI-graded portfolios, and debug with a 24/7 technical mentor.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              href="/roadmaps"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 group cursor-pointer w-full sm:w-auto justify-center"
            >
              Explore Roadmaps
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#ai-features"
              className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-250 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Explore AI Features
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED CAREER PATHS */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-2xl font-bold md:text-3xl text-white">Featured Career Paths</h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              Select one of our popular engineering tracks to generate visual checkpoint roadmaps and get custom tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCareers.map((c) => (
              <div
                key={c.id}
                className="group rounded-2xl border border-neutral-900 bg-neutral-900/30 overflow-hidden flex flex-col justify-between hover:border-indigo-500/30 hover:bg-neutral-900/50 transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="h-44 w-full relative overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                    <span className="absolute top-3 right-3 bg-neutral-950 border border-neutral-800 text-[10px] text-indigo-400 font-bold px-2 py-0.5 rounded">
                      {c.difficulty}
                    </span>
                  </div>

                  <div className="px-5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-neutral-500">
                      <span>Duration: {c.duration}</span>
                      <span className="text-cyan-400 font-semibold">⭐ {c.rating} Rating</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-6 mt-4 border-t border-neutral-900/40 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-neutral-500 font-semibold uppercase">Avg Salary</p>
                    <p className="text-xs font-bold text-emerald-400">{c.salary}</p>
                  </div>
                  <Link
                    href={`/roadmaps/${c.id}`}
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI FEATURES */}
      <section id="ai-features" className="py-20 border-b border-neutral-900 bg-neutral-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium">
              Intelligence Engine
            </span>
            <h2 className="text-2xl font-bold md:text-3xl text-white">Full-Suite AI Assistance</h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              Our agentic platform handles the structure so you can focus on writing compilable code files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiFeatures.map((f, idx) => {
              const IconComp = f.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-900 bg-neutral-900/30 p-6 space-y-4 hover:border-indigo-500/20 transition-all duration-300 shadow-md"
                >
                  <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                    <IconComp className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{f.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. POPULAR LEARNING ROADMAPS */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-2xl font-bold md:text-3xl text-white">Popular Learning Roadmaps</h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              A visual timeline demonstration of the four critical roadmap stages generated for students.
            </p>
          </div>

          <div className="relative border-l border-neutral-800 ml-4 md:ml-32 space-y-8 text-xs">
            {timelineMilestones.map((m, idx) => (
              <div key={idx} className="relative pl-6 md:pl-8">
                {/* Node circle */}
                <div className="absolute -left-3.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 border border-neutral-800 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start bg-neutral-900/20 border border-neutral-900 p-4 rounded-xl hover:border-indigo-500/20 transition-all">
                  <div className="md:col-span-1">
                    <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
                      {m.phase}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-neutral-200">{m.name}</h4>
                  </div>
                  <div className="md:col-span-1 md:text-right">
                    <span className="text-neutral-500 font-semibold">{m.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STATISTICS */}
      <section className="py-16 border-b border-neutral-900 bg-neutral-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {successStats.map((s, idx) => (
              <div key={idx} className="text-center space-y-1">
                <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {s.value}
                </p>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-2xl font-bold md:text-3xl text-white">Student Testimonials</h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              Hear verified feedback from engineers who transitioned careers using customized paths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-900 bg-neutral-900/20 p-6 sm:p-8 space-y-4 hover:border-neutral-800 transition-colors"
              >
                <p className="text-xs text-neutral-400 leading-relaxed italic">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border border-indigo-500/20"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BLOGS */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl text-white">Insights & Developer Blogs</h2>
              <p className="text-sm text-neutral-400 mt-1">Read expert columns on coding architectures and skill systems.</p>
            </div>
            <Link
              href="/blogs"
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider transition-colors"
            >
              Explore Blogs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((b, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-neutral-900 bg-neutral-900/20 p-6 space-y-4 hover:border-indigo-500/20 transition-all shadow-md"
              >
                <div className="flex justify-between items-center text-[10px] text-neutral-500">
                  <span>{b.date}</span>
                  <span>{b.readTime}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-neutral-450 leading-relaxed line-clamp-3">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-2xl font-bold md:text-3xl text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              Everything you need to know about SkillForge AI career acceleration.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-850 bg-neutral-900/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left text-xs font-semibold text-white hover:bg-neutral-900/20 transition-colors select-none cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-400" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs text-neutral-450 border-t border-neutral-900/50 leading-relaxed bg-neutral-900/10">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-indigo-950/20 via-neutral-950 to-neutral-950 text-center relative overflow-hidden border-b border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Start Forging Your Path Today
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Take control of your learning. Let AI structure your career progression, critique your code, and guide you to your dream job.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer"
            >
              Create Free Account
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 text-neutral-200 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-300"
            >
              Read Platform Mission
            </Link>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER */}
      <section className="py-16 bg-neutral-950 text-center border-b border-neutral-900">
        <div className="mx-auto max-w-md px-4 space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Join the Newsletter</h3>
            <p className="text-xs text-neutral-500">Subscribe for custom career insights and monthly roadmap frameworks.</p>
          </div>

          {newsletterSubscribed ? (
            <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 py-2.5 rounded-lg">
              Check your inbox! We have dispatched a verification email.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
