"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Compass, Clock, Award, Star, Search, ShieldAlert, ArrowRight, X } from "lucide-react";

export default function ExplorePage() {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Most Popular");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 2; // Slice into 2 items per page to make pages 1 2 3 4 all functional with 8 items!

  const categories = ["All", "Software Engineering", "AI & Data Science", "Cloud & Operations", "Cybersecurity"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const durations = ["All", "Short (1-3mo)", "Medium (4-6mo)", "Long (7mo+)"];
  const salaries = ["All", "< $100k", "$100k - $130k", "$130k+"];
  const ratings = ["All", "4.5 Stars+", "4.8 Stars+"];
  const sortOptions = ["Most Popular", "Highest Rated", "Highest Salary", "Newest"];

  const allCareers = [
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      category: "Software Engineering",
      difficulty: "Medium",
      duration: "4 Months",
      durationVal: 4,
      salary: "$115,000",
      salaryVal: 115000,
      rating: 4.8,
      popularity: 1500,
      created: "2026-05-10",
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
      desc: "Create responsive client-side visual interfaces, manage application states, and optimize asset distribution pipelines.",
    },
    {
      id: "ai-engineer",
      title: "AI Engineer",
      category: "AI & Data Science",
      difficulty: "Hard",
      duration: "6 Months",
      durationVal: 6,
      salary: "$145,000",
      salaryVal: 145000,
      rating: 4.9,
      popularity: 2500,
      created: "2026-07-01",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
      desc: "Integrate vector databases, establish context-aware retrieval chains (RAG), and fine-tune transformer models.",
    },
    {
      id: "backend-developer",
      title: "Backend Developer",
      category: "Software Engineering",
      difficulty: "Medium",
      duration: "5 Months",
      durationVal: 5,
      salary: "$120,000",
      salaryVal: 120000,
      rating: 4.7,
      popularity: 1800,
      created: "2026-04-12",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
      desc: "Architect RESTful services, construct relational caches, coordinate distributed message systems, and manage DBs.",
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      category: "Cloud & Operations",
      difficulty: "Hard",
      duration: "9 Months",
      durationVal: 9,
      salary: "$135,000",
      salaryVal: 135000,
      rating: 4.8,
      popularity: 1200,
      created: "2026-06-15",
      image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
      desc: "Deploy container orchestrations (Kubernetes), configure CI/CD automations, and manage IaC configuration matrices.",
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      category: "AI & Data Science",
      difficulty: "Medium",
      duration: "6 Months",
      durationVal: 6,
      salary: "$130,000",
      salaryVal: 130000,
      rating: 4.6,
      popularity: 900,
      created: "2026-01-20",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      desc: "Train classical machine learning models, scrub raw data metrics, and formulate statistical predictive reports.",
    },
    {
      id: "cyber-security-engineer",
      title: "Cyber Security Engineer",
      category: "Cybersecurity",
      difficulty: "Hard",
      duration: "7 Months",
      durationVal: 7,
      salary: "$125,000",
      salaryVal: 125000,
      rating: 4.8,
      popularity: 1100,
      created: "2026-03-05",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      desc: "Perform network vulnerability scans, mitigate active XSS exploits, and audit server endpoints permissions.",
    },
    {
      id: "cloud-security-specialist",
      title: "Cloud Security Specialist",
      category: "Cybersecurity",
      difficulty: "Hard",
      duration: "8 Months",
      durationVal: 8,
      salary: "$140,000",
      salaryVal: 140000,
      rating: 4.7,
      popularity: 700,
      created: "2026-06-25",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&q=80",
      desc: "Enforce cloud identity barriers, configure network firewalls, and verify Kubernetes cluster access limits.",
    },
    {
      id: "full-stack-developer",
      title: "Full Stack Developer",
      category: "Software Engineering",
      difficulty: "Easy",
      duration: "3 Months",
      durationVal: 3,
      salary: "$95,000",
      salaryVal: 95000,
      rating: 4.5,
      popularity: 600,
      created: "2026-07-10",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      desc: "Build end-to-end full stack web platforms, integrate databases, and configure public hosting endpoints.",
    },
  ];

  // Filtering + Sorting computations
  const processedCareers = useMemo(() => {
    let result = [...allCareers];

    // Search query
    if (searchQuery.trim() !== "") {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (categoryFilter !== "All") {
      result = result.filter((c) => c.category === categoryFilter);
    }

    // Difficulty
    if (diffFilter !== "All") {
      result = result.filter((c) => c.difficulty === diffFilter);
    }

    // Duration
    if (durationFilter !== "All") {
      if (durationFilter.startsWith("Short")) {
        result = result.filter((c) => c.durationVal <= 3);
      } else if (durationFilter.startsWith("Medium")) {
        result = result.filter((c) => c.durationVal >= 4 && c.durationVal <= 6);
      } else {
        result = result.filter((c) => c.durationVal >= 7);
      }
    }

    // Salary range
    if (salaryFilter !== "All") {
      if (salaryFilter.startsWith("<")) {
        result = result.filter((c) => c.salaryVal < 100000);
      } else if (salaryFilter.includes("-")) {
        result = result.filter((c) => c.salaryVal >= 100000 && c.salaryVal <= 130000);
      } else {
        result = result.filter((c) => c.salaryVal >= 130000);
      }
    }

    // Rating
    if (ratingFilter !== "All") {
      if (ratingFilter.startsWith("4.5")) {
        result = result.filter((c) => c.rating >= 4.5);
      } else {
        result = result.filter((c) => c.rating >= 4.8);
      }
    }

    // Sorting
    if (sortOption === "Most Popular") {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Highest Salary") {
      result.sort((a, b) => b.salaryVal - a.salaryVal);
    } else if (sortOption === "Newest") {
      result.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    }

    return result;
  }, [searchQuery, categoryFilter, diffFilter, durationFilter, salaryFilter, ratingFilter, sortOption]);

  // Page index slice
  const paginatedCareers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedCareers.slice(startIndex, startIndex + itemsPerPage);
  }, [processedCareers, currentPage]);

  const totalPages = Math.max(1, Math.ceil(processedCareers.length / itemsPerPage));

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setDiffFilter("All");
    setDurationFilter("All");
    setSalaryFilter("All");
    setRatingFilter("All");
    setSortOption("Most Popular");
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="mx-auto max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium">
            <Compass className="h-3.5 w-3.5 animate-spin-slow" />
            Explore Career Roads
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Explore AI-Powered Portfolios
          </h1>
          <p className="text-sm text-neutral-400">
            Search, filter, and sort among popular engineering roadmaps designed dynamically to align with actual job requirements.
          </p>
        </div>

        {/* Explore Panel Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Filters Sidebar */}
          <div className="lg:col-span-3 rounded-2xl border border-neutral-900 bg-neutral-900/30 p-5 space-y-5 backdrop-blur-sm">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Filters</h3>
              <button
                onClick={resetFilters}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Difficulty</label>
              <select
                value={diffFilter}
                onChange={(e) => { setDiffFilter(e.target.value); setCurrentPage(1); }}
                className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Duration</label>
              <select
                value={durationFilter}
                onChange={(e) => { setDurationFilter(e.target.value); setCurrentPage(1); }}
                className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              >
                {durations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Salary Range */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Salary Range</label>
              <select
                value={salaryFilter}
                onChange={(e) => { setSalaryFilter(e.target.value); setCurrentPage(1); }}
                className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              >
                {salaries.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Min Rating</label>
              <select
                value={ratingFilter}
                onChange={(e) => { setRatingFilter(e.target.value); setCurrentPage(1); }}
                className="w-full bg-neutral-950 border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              >
                {ratings.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right panel: Active directory */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search + Sort Top header bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-neutral-900 pb-4">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search titles or technologies..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              {/* Sort selection */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
                <span className="text-neutral-500 font-semibold uppercase text-[10px]">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
                >
                  {sortOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Catalog Grid */}
            {paginatedCareers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedCareers.map((c) => (
                  <div
                    key={c.id}
                    className="group rounded-2xl border border-neutral-900 bg-neutral-900/20 overflow-hidden flex flex-col justify-between hover:border-indigo-500/30 hover:bg-neutral-900/40 transition-all duration-300 shadow-lg"
                  >
                    <div className="space-y-4">
                      {/* Technical Image */}
                      <div className="h-40 w-full relative overflow-hidden">
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

                      {/* Info body */}
                      <div className="px-5 space-y-2 text-xs">
                        <div className="flex justify-between items-center text-[10px] text-neutral-500 font-semibold">
                          <span>Duration: {c.duration}</span>
                          <span className="text-cyan-400 flex items-center gap-0.5">⭐ {c.rating}</span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-neutral-450 leading-relaxed line-clamp-3">
                          {c.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom stats and button */}
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
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-350">No Tracks Found</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
                    No career path match your active filters. Try resetting controls to view all listings.
                  </p>
                </div>
              </div>
            )}

            {/* Numbered Pagination (1 2 3 4) */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-neutral-900/40 flex justify-center items-center gap-1.5 text-xs">
                {Array.from({ length: Math.min(4, totalPages) }, (_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-8 w-8 rounded-lg font-semibold transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white animate-pulse"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
