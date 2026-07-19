"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { signIn, signUp } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import { UserPlus, Sparkles, Eye, EyeOff, AlertCircle, CheckCircle2, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (isLoggedIn) router.push("/dashboard");
  }, [isLoggedIn, router]);

  const passwordValue = watch("password");

  // Password strength indicator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { score, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score, label: "Good", color: "bg-cyan-500" };
    return { score, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(passwordValue);

  // Email / Password registration via Better Auth → saves to MongoDB
  const onSubmit = async (data: RegisterFormValues) => {
    setServerError("");
    setSuccessMessage("");
    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });

      if (result?.error) {
        setServerError(result.error.message || "Registration failed. Please try again.");
        return;
      }

      setSuccessMessage("Account created! Redirecting to dashboard...");
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch {
      setServerError("Registration failed due to server error. Please try again.");
    }
  };

  // Google OAuth sign-in / sign-up
  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setServerError("");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch {
      setServerError("Network error. Could not connect to Google OAuth provider.");
    } finally {
      setIsGoogleLoading(false);
    }
  };  const inputClass = (hasError: boolean) =>
    `w-full input-glass text-xs text-white focus:outline-none transition-all duration-300 ${
      hasError
        ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
        : "focus:input-glass-focus"
    }`;

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-transparent relative overflow-hidden">
      {/* Decorative ambient glows behind container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="relative rounded-3xl glass-card p-8 shadow-2xl overflow-hidden space-y-5">
          {/* Header */}
          <div className="text-center space-y-2 relative">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,241,0.15)]">
              <UserPlus className="h-5 w-5 text-cyan-400" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-xs text-slate-400">
              Start forging your custom career path. Free tier available.
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] text-slate-200 hover:text-white font-semibold text-xs py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.01]"
          >
            {isGoogleLoading ? (
              <div className="h-4 w-4 rounded-full border-2 border-neutral-500 border-t-white animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {isGoogleLoading ? "Redirecting to Google..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">or register with email</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3.5 py-2.5 rounded-xl"
              >
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{serverError}</span>
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-2.5 rounded-xl"
              >
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs" noValidate>
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-350">Full Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                className={inputClass(!!errors.name)}
              />
              {errors.name && (
                <p className="flex items-center gap-1 text-[10px] text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-350">Email Address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="jane@domain.com"
                autoComplete="email"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="flex items-center gap-1 text-[10px] text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-350">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters, 1 uppercase, 1 number"
                  autoComplete="new-password"
                  className={`${inputClass(!!errors.password)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Password strength bar */}
              {passwordValue && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength.score ? strength.color : "bg-white/[0.06]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Strength: <span className={`font-semibold ${strength.score >= 3 ? "text-emerald-400" : strength.score === 2 ? "text-amber-400" : "text-red-400"}`}>{strength.label}</span>
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="flex items-center gap-1 text-[10px] text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-350">Confirm Password</label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`${inputClass(!!errors.confirmPassword)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="flex items-center gap-1 text-[10px] text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <br/>
            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary hover:btn-primary-hover disabled:bg-white/[0.02] disabled:text-slate-650 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10"
            >
              {isSubmitting ? (
                <>
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-indigo-300/30 border-t-indigo-300 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200 animate-pulse" />
                  Create Account & Start
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
