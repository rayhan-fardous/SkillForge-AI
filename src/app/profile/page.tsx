"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Pencil,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Globe,
  Briefcase,
  FileText,
  Shield,
  Mail,
  Camera,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  careerGoal: string;
  bio: string;
  location: string;
  website: string;
}

// ── Career goal options ───────────────────────────────────────────────────────

const CAREER_GOALS = [
  "",
  "DevOps & SRE Engineer",
  "Frontend React/Next.js Engineer",
  "AI Engineer (LLMs & RAG)",
  "Data Science Specialist",
  "Backend Developer",
  "Full Stack Developer",
  "Cyber Security Engineer",
  "Cloud Security Specialist",
];

// ── Skeleton loader ───────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden animate-pulse">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="flex items-center gap-4 border-b border-white/[0.06] pb-6">
        <div className="h-20 w-20 rounded-full bg-white/[0.06]" />
        <div className="space-y-2">
          <div className="h-4 w-36 bg-white/[0.06] rounded" />
          <div className="h-3 w-24 bg-white/[0.04] rounded" />
          <div className="h-3 w-20 bg-white/[0.04] rounded" />
        </div>
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-3 w-20 bg-white/[0.06] rounded" />
          <div className="h-9 w-full bg-white/[0.04] rounded-xl" />
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  // Data state
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<ProfileData>>({});
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch profile from API
  const fetchProfile = async () => {
    setLoadingProfile(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to load profile");
      }
      const data: ProfileData = await res.json();
      setProfile(data);
      setAvatarPreview(data.avatar);
    } catch (err: any) {
      setFetchError(err.message || "Unknown error");
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Start editing — pre-fill form with current profile
  const handleStartEdit = () => {
    if (!profile) return;
    setForm({
      name: profile.name,
      careerGoal: profile.careerGoal,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      avatar: profile.avatar,
    });
    setAvatarPreview(profile.avatar);
    setSaveError(null);
    setSaveSuccess(false);
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setSaveError(null);
    setAvatarPreview(profile?.avatar || "");
  };

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "avatar" && value.trim()) {
      setAvatarPreview(value.trim());
    }
  };

  // Save profile
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save profile");
      }

      // ── Re-fetch the full profile from the DB so the view shows confirmed
      //    data rather than optimistic local state. This also picks up any
      //    server-side transformations (e.g. name trimming).
      const refreshRes = await fetch("/api/profile");
      if (refreshRes.ok) {
        const fresh = await refreshRes.json();
        setProfile(fresh);
        setAvatarPreview(fresh.avatar);
      }

      setSaveSuccess(true);
      setIsEditing(false);

      // Force Next.js to revalidate server components (Navbar session etc.)
      router.refresh();

      // Auto-dismiss success toast
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setSaveError(err.message || "An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  // ── Shared input class ────────────────────────────────────────────────────
  const inputClass =
    "w-full input-glass focus:input-glass-focus px-3.5 py-2.5 text-xs";
  const labelClass = "font-semibold text-slate-400 text-[10px] uppercase tracking-wider";
  const disabledInputClass =
    "w-full bg-white/[0.015] border border-white/[0.04] rounded-xl px-3.5 py-2.5 text-[10px] text-slate-600 cursor-not-allowed";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <ProtectedRoute>
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-72 bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-72 h-60 bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-xl space-y-6 relative z-10">

          {/* ── Page Header ───────────────────────────────────────────────── */}
          <div className="flex items-start justify-between border-b border-white/[0.06] pb-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <User className="h-5 w-5 text-blue-400" />
                Member Profile
              </h1>
              <p className="text-xs text-slate-400">
                Manage your personal metadata, career preferences, and account details.
              </p>
            </div>

            {/* Edit / Cancel toggle button */}
            {!loadingProfile && profile && (
              <div className="flex-shrink-0">
                {isEditing ? (
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 btn-secondary hover:btn-secondary-hover text-slate-300 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={handleStartEdit}
                    className="flex items-center gap-1.5 btn-primary hover:btn-primary-hover text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── Success Toast ─────────────────────────────────────────────── */}
          {saveSuccess && (
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs px-4 py-3 rounded-xl border border-emerald-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span className="font-semibold">Profile updated successfully!</span>
            </div>
          )}

          {/* ── Fetch Error ───────────────────────────────────────────────── */}
          {fetchError && (
            <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-xs px-4 py-3 rounded-xl border border-red-500/20">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{fetchError}</span>
              <button
                onClick={fetchProfile}
                className="ml-auto underline hover:no-underline font-semibold cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* ── Main Card ─────────────────────────────────────────────────── */}
          {loadingProfile ? (
            <ProfileSkeleton />
          ) : profile ? (
            <div className="glass-card rounded-2xl overflow-hidden relative">
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

              {/* ── Avatar Header Band ────────────────────────────────────── */}
              <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={isEditing ? avatarPreview : profile.avatar}
                      alt={profile.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
                      }}
                      className="h-20 w-20 rounded-full object-cover border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    />
                    {/* Online dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-emerald-500 rounded-full border-2 border-[#0B1120]" />
                  </div>

                  {/* Name / Role / Email */}
                  <div className="space-y-1 min-w-0">
                    <h2 className="text-base font-bold text-white leading-tight truncate">
                      {isEditing ? (form.name || profile.name) : profile.name}
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3 w-3 text-purple-400 flex-shrink-0" />
                      <span className="text-[10px] text-purple-300 font-semibold capitalize">
                        {profile.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3 text-slate-500 flex-shrink-0" />
                      <span className="text-[10px] text-slate-500 truncate">
                        {profile.email}
                      </span>
                    </div>
                    {(isEditing ? form.careerGoal : profile.careerGoal) && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-3 w-3 text-blue-400 flex-shrink-0" />
                        <span className="text-[10px] text-blue-300 truncate">
                          {isEditing ? form.careerGoal : profile.careerGoal}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location / Website chips (view mode) */}
                {!isEditing && (profile.location || profile.website) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.location && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-lg">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        {profile.location}
                      </div>
                    )}
                    {profile.website && (
                      <a
                        href={
                          profile.website.startsWith("http")
                            ? profile.website
                            : `https://${profile.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-500/[0.06] border border-cyan-500/20 px-2.5 py-1 rounded-lg hover:bg-cyan-500/10 transition-colors"
                      >
                        <Globe className="h-3 w-3" />
                        {profile.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                )}

                {/* Bio (view mode) */}
                {!isEditing && profile.bio && (
                  <p className="mt-3 text-[11px] text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3">
                    {profile.bio}
                  </p>
                )}
              </div>

              {/* ── View Mode — Info rows ─────────────────────────────────── */}
              {!isEditing && (
                <div className="px-6 sm:px-8 py-5 space-y-4">
                  <InfoRow icon={<Mail className="h-3.5 w-3.5 text-slate-500" />} label="Email" value={profile.email} muted />
                  <InfoRow icon={<Briefcase className="h-3.5 w-3.5 text-blue-400" />} label="Career Goal" value={profile.careerGoal || "Not set"} muted={!profile.careerGoal} />
                  <InfoRow icon={<MapPin className="h-3.5 w-3.5 text-slate-500" />} label="Location" value={profile.location || "Not set"} muted={!profile.location} />
                  <InfoRow icon={<Globe className="h-3.5 w-3.5 text-cyan-400" />} label="Website" value={profile.website || "Not set"} muted={!profile.website} link={profile.website} />
                </div>
              )}

              {/* ── Edit Mode — Form ──────────────────────────────────────── */}
              {isEditing && (
                <form onSubmit={handleSave} className="px-6 sm:px-8 py-5 space-y-5">

                  {/* Save error */}
                  {saveError && (
                    <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-xs px-3.5 py-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{saveError}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Display Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      value={form.name || ""}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>

                  {/* Email (read-only) */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={profile.email}
                      className={disabledInputClass}
                    />
                    <p className="text-[9px] text-slate-600">Email cannot be changed.</p>
                  </div>

                  {/* Career Goal */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Primary Career Goal</label>
                    <select
                      name="careerGoal"
                      value={form.careerGoal || ""}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">— Select a career path —</option>
                      {CAREER_GOALS.filter(Boolean).map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bio */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio || ""}
                      onChange={handleChange}
                      rows={3}
                      placeholder="A short description about yourself..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                      <input
                        type="text"
                        name="location"
                        value={form.location || ""}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Website / Portfolio</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                      <input
                        type="url"
                        name="website"
                        value={form.website || ""}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.dev"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  {/* Avatar URL */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Avatar URL</label>
                    <div className="relative">
                      <Camera className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                      <input
                        type="url"
                        name="avatar"
                        value={form.avatar || ""}
                        onChange={handleChange}
                        placeholder="https://example.com/avatar.jpg"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                    <p className="text-[9px] text-slate-600">
                      Paste a direct image URL. Preview updates in real-time above.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2 border-t border-white/[0.05]">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex-1 btn-secondary hover:btn-secondary-hover text-slate-300 font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 btn-primary hover:btn-primary-hover text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Saving…
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : null}

          {/* ── Account Details Card ──────────────────────────────────────── */}
          {!loadingProfile && profile && !isEditing && (
            <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Account Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-600 uppercase font-bold tracking-wider">Account Role</p>
                  <p className="text-slate-300 font-semibold capitalize">{profile.role}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-600 uppercase font-bold tracking-wider">Auth Provider</p>
                  <p className="text-slate-300 font-semibold">Email & Password</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}

// ── Info Row sub-component ────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
  muted = false,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
  link?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-white/[0.04] last:border-0">
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {icon}
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      {link ? (
        <a
          href={link.startsWith("http") ? link : `https://${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors truncate max-w-[55%] text-right"
        >
          {value}
        </a>
      ) : (
        <span
          className={`text-xs font-semibold truncate max-w-[55%] text-right ${
            muted ? "text-slate-500 italic" : "text-slate-200"
          }`}
        >
          {value}
        </span>
      )}
    </div>
  );
}
