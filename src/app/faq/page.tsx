"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the AI generate learning roadmaps?",
      a: "Our AI model analyzes your career aspirations, current skill level, daily time commitment, and industry demand. It cross-references millions of active developer profiles and open job listings to output a highly personalized roadmap consisting of progressive milestones, curated resources, and hands-on projects.",
    },
    {
      q: "What is the AI Project Evaluation?",
      a: "When you complete a project, you upload your codebase or link a GitHub repository. Our AI agent compiles the code, performs static analysis, runs checks on code quality, security vulnerabilities, architectural patterns, and gives you a score with inline feedback, mimicking a senior developer's code review.",
    },
    {
      q: "Can I use the platform for free?",
      a: "Yes! SkillForge AI offers a free tier that gives you access to public roadmaps, basic project prompts, and a daily allocation of AI Mentor queries. Upgrading to Premium unlocks unlimited AI generations, interactive dashboard tracking, detailed code reviews, and advanced career path matching.",
    },
    {
      q: "How does the AI Mentor help me daily?",
      a: "The AI Mentor is a highly specialized LLM trained on documentation, system design patterns, and engineering best practices. It's available 24/7 inside your editor/dashboard. You can ask it to explain concepts, refactor code snippets, debug errors, or practice system design interviews.",
    },
    {
      q: "Can I import custom learning resources?",
      a: "Yes! If you are following a specific YouTube course, book, or university syllabus, you can paste the text description or link inside the 'Add Learning Goals' page. Our AI parser extracts the core objectives and generates specific milestones for it.",
    },
    {
      q: "Does SkillForge AI support teams and corporations?",
      a: "Absolutely. We offer a Team Dashboard that allows team leads to assign specific learning goals, monitor skill progression metrics across developers, and ensure security engineering baselines are met.",
    },
  ];

  return (
    <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-blue-500/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-3xl space-y-14 relative z-10">

        {/* Header */}
        <div className="text-center space-y-5 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium shadow-[0_0_12px_rgba(59,130,246,0.1)]">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Expanded Knowledge Base
          </h1>
          <p className="text-sm text-slate-400">
            Have questions about how we evaluate projects, integrate AI mentors, or configure team settings? Find your answers below.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-[0_0_20px_rgba(59,130,246,0.08)]" : ""}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left text-xs font-semibold text-white hover:bg-white/[0.02] transition-colors select-none cursor-pointer group"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-0 text-xs text-slate-400 border-t border-white/[0.05] leading-relaxed bg-white/[0.01]">
                        <div className="pt-4">{item.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
