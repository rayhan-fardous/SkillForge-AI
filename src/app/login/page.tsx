"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { signIn } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import { LogIn, Sparkles, Eye, EyeOff, AlertCircle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isLoggedIn) router.push("/dashboard");
  }, [isLoggedIn, router]);

  // Autofill demo credentials
  const handleAutofill = () => {
    setValue("email", "rayhan.fardous@skillforge.ai", { shouldValidate: true });
    setValue("password", "Rayhan@123", { shouldValidate: true });
  };

  // Email / Password sign-in via Better Auth
  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });

      if (result?.error) {
        setServerError(result.error.message || "Invalid credentials. Please try again.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setServerError("Network error. Could not connect to the authentication server.");
    }
  };

  // Google OAuth sign-in
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setServerError("");
    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (result?.error) {
        setServerError(result.error.message || "Google Login failed. Please check your OAuth configuration.");
      }
    } catch {
      setServerError("Network error. Could not connect to the authentication server.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
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
        <div className="relative rounded-3xl glass-card p-8 shadow-2xl overflow-hidden space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 relative">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,241,0.15)]">
              <LogIn className="h-5 w-5 text-cyan-400" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-xs text-slate-400">
              Sign in to continue forging your career path.
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
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
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">or sign in with email</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Server error alert */}
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
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-slate-350">Email Address</label>
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="alex@example.com"
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
              <div className="flex justify-between items-center">
                <label className="font-semibold text-slate-350">Password</label>
                <a href="#" className="text-[10px] text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
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
              {errors.password && (
                <p className="flex items-center gap-1 text-[10px] text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Autofill Demo Credentials */}
            <button
              type="button"
              onClick={handleAutofill}
              className="w-full flex items-center justify-center gap-2 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] text-slate-300 hover:text-white font-semibold text-[10px] py-2 rounded-xl transition-all duration-200 cursor-pointer uppercase tracking-wider"
            >
              <Zap className="h-3 w-3 text-cyan-400" />
              Autofill Demo Credentials
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary hover:btn-primary-hover disabled:bg-white/[0.02] disabled:text-slate-600 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10"
            >
              {isSubmitting ? (
                <>
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-indigo-300/30 border-t-indigo-300 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200 animate-pulse" />
                  Sign In & Launch Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
