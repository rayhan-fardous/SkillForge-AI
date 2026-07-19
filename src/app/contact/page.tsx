"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Send } from "lucide-react";
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

  const labelClass = "font-semibold text-slate-300 text-xs";
  const inputClass = "w-full input-glass focus:input-glass-focus px-3.5 py-2.5";

  return (
    <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-xl space-y-12 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium shadow-[0_0_12px_rgba(59,130,246,0.1)]">
            <Mail className="h-3.5 w-3.5" />
            Support &amp; Inquiries
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-sm text-slate-400">
            Have questions about billing, custom organization licenses, or feedback? Send us a message and our support agents will respond in under 6 hours.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.25)] animate-pulse">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Message Transmitted</h3>
                <p className="text-xs text-slate-400">
                  Your inquiry has been stored. A member of the SkillForge team will follow up via email shortly.
                </p>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 btn-secondary hover:btn-secondary-hover px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@domain.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Enterprise Team Licensing"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Detailed Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our technical support or relations team help you?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary hover:btn-primary-hover disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Transmitting Message...
                    </>
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
