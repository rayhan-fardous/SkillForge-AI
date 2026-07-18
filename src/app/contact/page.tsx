"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="mx-auto max-w-xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium">
            <Mail className="h-3.5 w-3.5" />
            Support & Inquiries
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Get in Touch
          </h1>
          <p className="text-sm text-neutral-400">
            Have questions about billing, custom organization licenses, or feedback? Send us a message and our support agents will respond in under 6 hours.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8 shadow-xl backdrop-blur-sm relative overflow-hidden">
          
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Message Transmitted</h3>
                <p className="text-xs text-neutral-400">
                  Your inquiry has been stored. A member of the SkillForge team will follow up via email shortly.
                </p>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-4 py-2 bg-neutral-955 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@domain.com"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Enterprise Team Licensing"
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Detailed Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our technical support or relations team help you?"
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-500 font-semibold text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {isSubmitting ? (
                    "Transmitting Message..."
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
