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
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-neutral-950 border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors ${
      hasError
        ? "border-red-500/60 focus:border-red-500"
        : "border-neutral-800 focus:border-indigo-500/60"
    }`;

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/15 via-neutral-950 to-neutral-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="relative rounded-2xl border border-neutral-900 bg-neutral-900/50 p-8 backdrop-blur-md shadow-2xl overflow-hidden space-y-5">
          {/* Glow decorations */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-600/5 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 relative">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <UserPlus className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-xs text-neutral-400">
              Start forging your custom career path. Free tier available.
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/[0.04] hover:bg-white/[0.07] border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-semibold text-xs py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
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
            <div className="flex-1 h-px bg-neutral-900" />
            <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider">or register with email</span>
            <div className="flex-1 h-px bg-neutral-900" />
          </div>

          {/* Server error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3.5 py-2.5 rounded-lg"
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
                className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-2.5 rounded-lg"
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
              <label className="font-semibold text-neutral-300">Full Name</label>
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
              <label className="font-semibold text-neutral-300">Email Address</label>
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
              <label className="font-semibold text-neutral-300">Password</label>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
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
                          i <= strength.score ? strength.color : "bg-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-neutral-500">
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
              <label className="font-semibold text-neutral-300">Confirm Password</label>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
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
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-500 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              {isSubmitting ? (
                <>
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-indigo-300/30 border-t-indigo-300 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  Create Account & Start
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-neutral-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
