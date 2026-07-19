"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  Compass,
  Briefcase,
  BookOpen,
  Info,
  Mail,
  HelpCircle,
  LayoutDashboard,
  User,
  PlusCircle,
  FolderKanban,
  MessageSquare,
  BarChart3,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const publicLinks = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Roadmaps", href: "/roadmaps", icon: Compass },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
  ];

  const protectedLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Roadmaps", href: "/roadmaps", icon: Compass },
    { name: "Learning Goals", href: "/learning-goals", icon: BookOpen },
    { name: "Manage Goals", href: "/items/manage", icon: FolderKanban },
    { name: "AI Mentor", href: "/ai-mentor", icon: MessageSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const activeLinks = isLoggedIn ? protectedLinks : publicLinks;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#050816]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="SkillForge Logo"
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            SkillForge<span className="text-cyan-400">.AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {activeLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                  active
                    ? "text-blue-400 bg-white/[0.04] border border-white/[0.05]"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-blue-400" : "text-slate-500"}`} />
                {link.name}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section Buttons */}
        <div className="hidden lg:flex items-center gap-3">

          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/[0.06] transition-colors border border-white/[0.06] focus:outline-none cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-7 w-7 rounded-full object-cover border border-blue-500/30"
                />
                <span className="text-xs text-slate-350 font-medium">{user.name.split(" ")[0]}</span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/[0.08] bg-[#0B1120]/95 p-2 shadow-2xl z-20 backdrop-blur-xl"
                    >
                      <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                        <p className="text-xs font-semibold text-white">{user.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.04] transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="h-3.5 w-3.5 text-slate-500" />
                        My Profile
                      </Link>
                      
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 rounded-xl hover:bg-red-500/5 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <LogIn className="h-3.5 w-3.5 text-slate-500" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.06] bg-[#050816]/95 backdrop-blur-xl px-4 py-4 lg:hidden"
          >
            <div className="grid gap-2">
              {activeLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "text-blue-400 bg-white/[0.04] border border-white/[0.05]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-blue-400" : "text-slate-500"}`} />
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-white/[0.06] my-2" />

              {isLoggedIn && user ? (
                <div className="flex items-center justify-between p-2 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover border border-blue-500/20"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-medium text-slate-350 border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                  >
                    <LogIn className="h-4 w-4 text-slate-550" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-200"
                  >
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
