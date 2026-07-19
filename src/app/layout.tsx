import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillForge AI",
  description: "Accelerate your career with AI-generated roadmaps, hands-on projects, and real-time mentor feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-primary-bg text-neutral-100 selection:bg-blue-500/30 relative">
        {/* Ambient background glows */}
        <div className="fixed inset-0 z-0 pointer-events-none grid-pattern opacity-60" />
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] z-0 rounded-full blur-[150px] accent-glow-indigo opacity-70 pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-15%] w-[60%] h-[60%] z-0 rounded-full blur-[150px] accent-glow-cyan opacity-50 pointer-events-none" />
        <div className="fixed top-[25%] right-[15%] w-[40%] h-[40%] z-0 rounded-full blur-[150px] accent-glow-purple opacity-40 pointer-events-none" />
        
        <AuthProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

