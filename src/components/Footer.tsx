"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MessageSquare, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950 text-neutral-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-bold tracking-tight text-md">
                SkillForge<span className="text-cyan-400">.AI</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              An AI-powered career accelerator that designs custom, dynamic roadmaps, connects hands-on projects to your goals, and provides real-time mentor feedback.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700 transition-all duration-200" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700 transition-all duration-200" aria-label="GitHub">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700 transition-all duration-200" aria-label="Discord">
                <MessageSquare className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700 transition-all duration-200" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Public Routes Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/roadmaps" className="hover:text-white transition-colors">Roadmaps</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Protected Routes Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/learning-goals" className="hover:text-white transition-colors">Learning Goals</Link></li>
              <li><Link href="/ai-mentor" className="hover:text-white transition-colors">AI Mentor</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">AI Analytics</Link></li>
              <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Stay Updated</h3>
            <p className="text-xs text-neutral-500">Subscribe to our newsletter for AI career insights and trending roadmaps.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="you@domain.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg p-2 transition-colors cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {currentYear} SkillForge AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
