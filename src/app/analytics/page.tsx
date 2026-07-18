"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BarChart3, TrendingUp, Compass, Award, Activity } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skillData = [
    { subject: "Containers", A: 85, B: 110, fullMark: 150 },
    { subject: "K8s Deploy", A: 60, B: 130, fullMark: 150 },
    { subject: "CI/CD Pip", A: 50, B: 130, fullMark: 150 },
    { subject: "Linux CLI", A: 90, B: 100, fullMark: 150 },
    { subject: "Git Flow", A: 95, B: 90, fullMark: 150 },
    { subject: "IaC Terraform", A: 40, B: 140, fullMark: 150 },
  ];

  const historicalVelocity = [
    { week: "Wk 1", hours: 8.5 },
    { week: "Wk 2", hours: 12.0 },
    { week: "Wk 3", hours: 14.5 },
    { week: "Wk 4", hours: 19.2 },
  ];

  return (
    <ProtectedRoute>
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Header */}
          <div className="border-b border-neutral-900 pb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              AI Analytics & Skill Vectors
            </h1>
            <p className="text-xs text-neutral-400">
              Detailed tracking of your study velocity, skill distributions, and engineering ranks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Radar chart of skills */}
            <div className="lg:col-span-6 rounded-xl border border-neutral-900 bg-neutral-900/30 p-6 flex flex-col justify-between">
              <div className="space-y-1 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Skill Vector Distribution</h3>
                <p className="text-[10px] text-neutral-500">Compares your current skills (Purple) to top SRE candidates (Cyan).</p>
              </div>

              <div className="h-[280px] w-full text-xs flex justify-center items-center">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                      <PolarGrid stroke="#1f1f1f" />
                      <PolarAngleAxis dataKey="subject" stroke="#a3a3a3" fontSize={10} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#525252" fontSize={8} />
                      <Radar name="My Skills" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                      <Radar name="Market Target" dataKey="B" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} />
                      <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #262626" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-neutral-600">Loading skill chart...</div>
                )}
              </div>
            </div>

            {/* Line chart of hours */}
            <div className="lg:col-span-6 rounded-xl border border-neutral-900 bg-neutral-900/30 p-6 flex flex-col justify-between">
              <div className="space-y-1 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Learning Velocity</h3>
                <p className="text-[10px] text-neutral-500">Aggregated hours completed over the last 4 weeks.</p>
              </div>

              <div className="h-[280px] w-full text-xs">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalVelocity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                      <XAxis dataKey="week" stroke="#525252" fontSize={10} tickLine={false} />
                      <YAxis stroke="#525252" fontSize={10} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #262626" }} />
                      <Line type="monotone" dataKey="hours" stroke="#818cf8" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-neutral-600">Loading velocity chart...</div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
