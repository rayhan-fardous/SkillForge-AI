"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MessageSquare, Cpu, Terminal, ShieldAlert } from "lucide-react";

export default function AIMentorPage() {
  const [messages, setMessages] = useState([
    { sender: "mentor", text: "Hello! I am your SkillForge AI Mentor. Ask me any technical question, request code feedback, or ask how to structure your projects." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "That's a very advanced system design question! For distributed architectures, ensure you establish strong state coordination (e.g. using Raft consensus or Redis cache queues) to mitigate partition errors.";
      if (userMsg.toLowerCase().includes("kubernetes") || userMsg.toLowerCase().includes("docker")) {
        reply = "When building containers, prioritize multi-stage Dockerfiles. Separate dependencies from your final lightweight image (e.g. using alpine) to keep boot times fast and secure.";
      } else if (userMsg.toLowerCase().includes("react") || userMsg.toLowerCase().includes("next")) {
        reply = "With Next.js App Router, utilize Server Components for fast initial data loading. Move interactive event handlers and state down to small client leaf components annotated with 'use client'.";
      }

      setMessages(prev => [...prev, { sender: "mentor", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-transparent flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-6 flex flex-col h-[550px] relative z-10">
          
          {/* Header */}
          <div className="border-b border-white/[0.06] pb-4">
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              AI Engineer Mentor
            </h1>
            <p className="text-xs text-slate-400">
              Direct line to our code intelligence agent. Paste code blocks or debug output for immediate solutions.
            </p>
          </div>

          {/* Chat Panel */}
          <div className="flex-1 rounded-2xl glass-card p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Messages body */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-xl p-3 ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/10"
                      : "bg-white/[0.02] border border-white/[0.06] text-slate-200"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.02] border border-white/[0.06] text-slate-500 rounded-xl px-3 py-2 flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="flex gap-2 border-t border-white/[0.06] pt-3 mt-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your mentor a technical question..."
                className="flex-1 input-glass focus:input-glass-focus"
              />
              <button
                type="submit"
                className="btn-primary hover:btn-primary-hover text-white text-xs font-bold px-4 rounded-xl transition-all cursor-pointer"
              >
                Send Query
              </button>
            </form>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
