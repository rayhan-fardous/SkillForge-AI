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
  Settings,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isLoggedIn, user, toggleAuth, logout } = useAuth();
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
    { name: "Learning Goals", href: "/learning-goals", icon: BookOpen },
    { name: "Manage Goals", href: "/items/manage", icon: FolderKanban },
    { name: "AI Mentor", href: "/ai-mentor", icon: MessageSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const activeLinks = isLoggedIn ? protectedLinks : publicLinks;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            SkillForge<span className="text-cyan-400">.AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {activeLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                  active
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-indigo-400" : "text-neutral-500"}`} />
                {link.name}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dev Auth State Switcher */}
          <button
            onClick={toggleAuth}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer bg-neutral-900/80 hover:bg-neutral-800/80 border-neutral-800"
            title="Click to toggle between Guest and Authenticated views"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLoggedIn ? "bg-emerald-500 animate-ping" : "bg-neutral-600"}`} />
            <span className={isLoggedIn ? "text-emerald-400" : "text-neutral-400"}>
              Mock Auth: {isLoggedIn ? "On" : "Off"}
            </span>
          </button>

          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-neutral-900 transition-colors border border-neutral-800 focus:outline-none"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-7 w-7 rounded-full object-cover border border-indigo-500/30"
                />
                <span className="text-xs text-neutral-300 font-medium">{user.name.split(" ")[0]}</span>
                <ChevronDown className="h-3 w-3 text-neutral-500" />
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
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-800 bg-neutral-950 p-2 shadow-xl z-20"
                    >
                      <div className="px-3 py-2 border-b border-neutral-900 mb-1">
                        <p className="text-xs font-semibold text-neutral-200">{user.name}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-neutral-200 rounded-lg hover:bg-neutral-900 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="h-3.5 w-3.5" />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-neutral-200 rounded-lg hover:bg-neutral-900 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings className="h-3.5 w-3.5" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/5 transition-colors cursor-pointer text-left"
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white transition-colors"
              >
                <LogIn className="h-3.5 w-3.5 text-neutral-500" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 px-3.5 py-2 rounded-lg text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Mock Auth Switcher for Mobile */}
          <button
            onClick={toggleAuth}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border transition-all duration-300 bg-neutral-900 border-neutral-800"
          >
            <span className={`h-1 w-1 rounded-full ${isLoggedIn ? "bg-emerald-500 animate-ping" : "bg-neutral-600"}`} />
            <span className={isLoggedIn ? "text-emerald-400" : "text-neutral-400"}>Auth</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
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
            className="border-t border-neutral-900 bg-neutral-950 px-4 py-4 lg:hidden"
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-indigo-400 bg-indigo-500/10"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-indigo-400" : "text-neutral-500"}`} />
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-neutral-900 my-2" />

              {isLoggedIn && user ? (
                <div className="flex items-center justify-between p-2 bg-neutral-900/50 border border-neutral-900 rounded-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold text-neutral-200">{user.name}</p>
                      <p className="text-[10px] text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-xs font-medium text-neutral-300 border border-neutral-800 hover:bg-neutral-900 transition-colors"
                  >
                    <LogIn className="h-4 w-4 text-neutral-500" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
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
