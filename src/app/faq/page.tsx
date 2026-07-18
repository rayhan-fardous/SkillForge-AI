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
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="mx-auto max-w-3xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked Questions
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Expanded Knowledge Base
          </h1>
          <p className="text-sm text-neutral-400">
            Have questions about how we evaluate projects, integrate AI mentors, or configure team settings? Find your answers below.
          </p>
        </div>

        {/* FAQ grid */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-850 bg-neutral-900/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
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
                      <div className="p-5 pt-0 text-xs text-neutral-400 border-t border-neutral-900/50 leading-relaxed bg-neutral-900/10">
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
    </div>
  );
}
