"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  Compass,
  Clock,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Star,
  Activity,
  ChevronRight,
  TrendingUp,
  Cpu
} from "lucide-react";

// Mock Details Database for the 6 careers
const detailsDatabase: Record<string, any> = {
  "frontend-developer": {
    title: "Frontend Developer",
    overview: "Frontend developers are responsible for implementing the visual and interactive elements of web applications. They bridge the gap between design theory and technical implementation, managing layout structures, responsive behaviors, component state stores, and asset compilation pipelines to guarantee fluid client experiences.",
    difficulty: "Medium",
    duration: "4 Months",
    salaryEntry: "$85,000",
    salaryMid: "$115,000",
    salarySenior: "$165,000",
    skills: {
      beginner: ["HTML5 & Semantics", "Modern CSS & Flexbox/Grid", "ES6+ JavaScript Syntax", "Git Branching"],
      intermediate: ["React 19 Hooks", "Tailwind CSS v4 Styling", "State Stores (Zustand)", "TypeScript Systems"],
      advanced: ["Next.js App Router", "Server Components", "CI/CD & Hosting", "Performance Optimization"],
    },
    roadmap: [
      { step: 1, title: "Client Semantics & Layouts", desc: "Construct semantic HTML document trees and responsive CSS page layouts using Flexbox and Grid specifications." },
      { step: 2, title: "Modern Application Logics", desc: "Master asynchronous JavaScript flows, DOM interfaces, API fetch transactions, and package bundling configurations." },
      { step: 3, title: "Component Systems & Styling", desc: "Build isolated React interface views, configure strict TypeScript types, and style with utility Tailwind configurations." },
      { step: 4, title: "Production SSR Directories", desc: "Develop complex Next.js App Router applications, manage server-to-client component bridges, and deploy to serverless edges." },
    ],
    resources: [
      { name: "Mozilla Developer Network (MDN) Web Docs", type: "Documentation" },
      { name: "React 19 Official Upgrade Walkthrough", type: "Guide" },
      { name: "Tailwind CSS v4 Custom `@theme` Guidelines", type: "Reference Docs" },
      { name: "Next.js App Router Optimization Protocols", type: "Technical Standard" },
    ],
    reviews: [
      { name: "Sarah L.", rating: 5, comment: "The Next.js milestone structure matched corporate expectations perfectly. Excellent path!" },
      { name: "David K.", rating: 4, comment: "Loved the state management checkpoints. Explained Zustand context issues very clearly." },
    ],
    related: [
      { id: "backend-developer", title: "Backend Developer" },
      { id: "ai-engineer", title: "AI Engineer" },
    ],
    projects: [
      { title: "Task Management Board", diff: "Easy", hours: "8h", stack: ["React", "Tailwind CSS", "Zustand"] },
      { title: "Real-time SSE Traffic Monitor", diff: "Medium", hours: "16h", stack: ["Next.js", "Recharts", "SSE"] },
    ],
  },
  "ai-engineer": {
    title: "AI Engineer",
    overview: "AI engineers build intelligent software applications incorporating large language models, custom vector embeddings, and machine learning structures. They specialize in semantic vector indexing, prompt engineering architectures, and fine-tuning pipelines to establish context-aware systems.",
    difficulty: "Hard",
    duration: "6 Months",
    salaryEntry: "$110,000",
    salaryMid: "$145,000",
    salarySenior: "$210,000",
    skills: {
      beginner: ["Python Foundations", "NumPy & Pandas analytics", "Linear Algebra basics", "SQL Datastores"],
      intermediate: ["PyTorch Core", "Vector Embeddings", "Semantic Searches", "Pinecone Database"],
      advanced: ["LangChain Pipelines", "Agentic Loop Systems", "Model Fine-Tuning", "API Deployment"],
    },
    roadmap: [
      { step: 1, title: "Data Manipulation & Analytics", desc: "Master Python data wrangling, SQL joins, database indexes, and statistical analysis tools." },
      { step: 2, title: "Vector Systems & Embeddings", desc: "Generate semantic representation vectors, establish vector indexes, and run Pinecone similarity queries." },
      { step: 3, title: "Retrieval Augmented Generation (RAG)", desc: "Build LangChain pipeline graphs, load PDF context docs, and resolve hallucinations inside prompt structures." },
      { step: 4, title: "Autonomous Engineering Agents", desc: "Establish custom agent loops with tools execution capabilities and host secure containerized inference endpoints." },
    ],
    resources: [
      { name: "Hugging Face Model Hub Documentation", type: "Reference Hub" },
      { name: "LangChain Expression Language (LCEL) Manual", type: "Guide" },
      { name: "Pinecone Vector DB Scale Guidelines", type: "Documentation" },
      { name: "PyTorch Model Training Protocols", type: "Technical Standard" },
    ],
    reviews: [
      { name: "Marcus F.", rating: 5, comment: "Having the vector databases guides saved me days of searching stackoverflow. Absolutely fantastic." },
      { name: "Tina R.", rating: 5, comment: "Agentic Loop segments are state-of-the-art. Highly recommended if you want to build actual tools." },
    ],
    related: [
      { id: "data-scientist", title: "Data Scientist" },
      { id: "devops-engineer", title: "DevOps Engineer" },
    ],
    projects: [
      { title: "AI Document Summarizer", diff: "Medium", hours: "18h", stack: ["Next.js", "LangChain", "Pinecone"] },
      { title: "Autonomous QA Dev Agent", diff: "Hard", hours: "36h", stack: ["Go", "OpenAI APIs", "Docker"] },
    ],
  },
  "backend-developer": {
    title: "Backend Developer",
    overview: "Backend developers architect the server systems, databases, caching layers, and communication APIs of web applications. They focus on scalability, database indexing efficiency, security configurations, and coordinating asynchronous microservice messages.",
    difficulty: "Medium",
    duration: "5 Months",
    salaryEntry: "$90,000",
    salaryMid: "$120,000",
    salarySenior: "$175,000",
    skills: {
      beginner: ["Node.js Core", "Express Framework", "REST API designs", "SQL/PostgreSQL"],
      intermediate: ["NoSQL (MongoDB)", "Redis Caching", "Relational Joins & Indexes", "TypeScript APIs"],
      advanced: ["gRPC Protocols", "Redis PubSub message queues", "Docker containers", "AWS deployment"],
    },
    roadmap: [
      { step: 1, title: "API Designs & Express", desc: "Construct REST endpoints using Express, manage routing tables, and parse JSON requests securely." },
      { step: 2, title: "Database Indexing & Caches", desc: "Master Postgres configurations, create optimal database indexes, and implement Redis cache stores." },
      { step: 3, title: "TypeScript Backend Systems", desc: "Wrap API controllers with strict compile-time types and deploy microservices behind API gateways." },
      { step: 4, title: "Container Deployments", desc: "Dockerize server environments, establish local connection clusters, and host behind load balancers." },
    ],
    resources: [
      { name: "Node.js Best Practices Repository", type: "Code Guidelines" },
      { name: "PostgreSQL Query Performance Tuning Guide", type: "Documentation" },
      { name: "Redis Caching Patterns & Structures", type: "Reference Manual" },
    ],
    reviews: [
      { name: "Jason W.", rating: 5, comment: "The database optimization section is outstanding. Queries execution speed improved immediately." },
      { name: "Liam G.", rating: 4, comment: "Clear, logical transitions. Containerization segment was very helpful." },
    ],
    related: [
      { id: "frontend-developer", title: "Frontend Developer" },
      { id: "devops-engineer", title: "DevOps Engineer" },
    ],
    projects: [
      { title: "Task Manager JSON API", diff: "Easy", hours: "8h", stack: ["Express.js", "MongoDB", "JWT"] },
      { title: "Distributed WebSockets Server", diff: "Hard", hours: "24h", stack: ["Node.js", "Redis", "WebSockets"] },
    ],
  },
  "devops-engineer": {
    title: "DevOps Engineer",
    overview: "DevOps engineers configure site reliability parameters, containerize applications, and automate continuous delivery pipelines. They manage infrastructure configuration matrices, Kubernetes node clusters, site metrics, and monitoring tools.",
    difficulty: "Hard",
    duration: "9 Months",
    salaryEntry: "$100,000",
    salaryMid: "$135,000",
    salarySenior: "$195,000",
    skills: {
      beginner: ["Linux CLI & Bash", "Git workflows", "Networking concepts", "SSH key configs"],
      intermediate: ["Docker containers", "CI/CD (GitHub Actions)", "Terraform IaC", "Nginx controllers"],
      advanced: ["Kubernetes Clusters", "ArgoCD GitOps", "Prometheus Metrics", "SRE SLO/SLAs"],
    },
    roadmap: [
      { step: 1, title: "Linux CLI & Scripting", desc: "Perform complex Linux CLI operations, write Bash automation scripts, and manage networking routes." },
      { step: 2, title: "Continuous Delivery (CI/CD)", desc: "Build automated pipelines validating commits, triggering unit tests, and compiling production builds." },
      { step: 3, title: "Infrastructure as Code (IaC)", desc: "Declare cloud networks dynamically with Terraform scripts, managing modular resources blocks." },
      { step: 4, title: "Kubernetes Deployments", desc: "Scale replica containers inside local pods, coordinate services network gates, and monitor visual graphs." },
    ],
    resources: [
      { name: "Kubernetes Official Interactive Documentation", type: "Reference manual" },
      { name: "Terraform Providers Configuration Guides", type: "Documentation" },
      { name: "Prometheus Monitoring Alerts Recipes", type: "Guide" },
    ],
    reviews: [
      { name: "Chris H.", rating: 5, comment: "The ArgoCD GitOps sequence is state-of-the-art. Highly professional material." },
      { name: "Dora B.", rating: 5, comment: "Extremely thorough. Handled Terraform workspace configurations perfectly." },
    ],
    related: [
      { id: "ai-engineer", title: "AI Engineer" },
      { id: "cyber-security-engineer", title: "Cyber Security Engineer" },
    ],
    projects: [
      { title: "K8s ArgoCD Pipeline", diff: "Hard", hours: "30h", stack: ["Kubernetes", "ArgoCD", "Helm"] },
      { title: "Modular AWS Terraform Setup", diff: "Medium", hours: "14h", stack: ["Terraform", "AWS", "Nginx"] },
    ],
  },
  "data-scientist": {
    title: "Data Scientist",
    overview: "Data Scientists combine statistical reasoning, mathematical modeling, and programming systems to analyze complex data records and construct predictive systems. They clean raw data pipelines, train machine learning classifiers, and build analytical insight displays.",
    difficulty: "Medium",
    duration: "6 Months",
    salaryEntry: "$95,000",
    salaryMid: "$130,000",
    salarySenior: "$180,000",
    skills: {
      beginner: ["Python core syntax", "Jupyter Notebooks", "SQL relational databases", "Git tracking"],
      intermediate: ["Pandas structures", "Data visual graphings", "Numpy operations", "Matplotlib charts"],
      advanced: ["Scikit-Learn ML", "Feature engineering", "Classic ML classifiers", "Statistical hypotheses"],
    },
    roadmap: [
      { step: 1, title: "Data Wrangling & SQL", desc: "Ingest scattered database files, write SQL queries, and sanitize unstructured dataset values." },
      { step: 2, title: "Visual Analytics", desc: "Generate statistical data distributions, isolate key correlations, and compile graphs using Seaborn." },
      { step: 3, title: "Statistical Hypothesis", desc: "Run hypothesis models, calculate value distributions, and design experiments to validate data patterns." },
      { step: 4, title: "Machine Learning Models", desc: "Train regression classifiers, analyze confusion matrix scores, and deploy prediction models via APIs." },
    ],
    resources: [
      { name: "Pandas Data Analytics Reference Manual", type: "Documentation" },
      { name: "Scikit-Learn Classifiers Tutorials", type: "Guide" },
      { name: "Jupyter Notebook Deployment Guide", type: "Standard Docs" },
    ],
    reviews: [
      { name: "Alan T.", rating: 4, comment: "Very good statistics review. Help me clean messy arrays much faster." },
      { name: "Clara S.", rating: 5, comment: "Feature engineering lessons are excellent. Solved my ML validation issues." },
    ],
    related: [
      { id: "ai-engineer", title: "AI Engineer" },
      { id: "backend-developer", title: "Backend Developer" },
    ],
    projects: [
      { title: "Predictive Analytics API", diff: "Medium", hours: "20h", stack: ["Python", "FastAPI", "Scikit-Learn"] },
      { title: "Interactive Housing Data Dashboard", diff: "Easy", hours: "10h", stack: ["React", "Recharts", "SQL"] },
    ],
  },
  "cyber-security-engineer": {
    title: "Cyber Security Engineer",
    overview: "Cybersecurity engineers audit application systems, run vulnerability scans, identify security leaks, and configure authorization gates. They analyze vulnerability templates (OWASP Top 10), defend against active scripts injection (XSS), and formulate secure networks rules.",
    difficulty: "Hard",
    duration: "7 Months",
    salaryEntry: "$95,000",
    salaryMid: "$125,000",
    salarySenior: "$185,000",
    skills: {
      beginner: ["Linux bash shell", "Networking gates & ports", "TCP/IP models", "Wireshark sniffing"],
      intermediate: ["OWASP vulnerabilities", "Burp Suite interceptor", "SQL injection scripts", "XSS preventions"],
      advanced: ["JWT secure validations", "OAuth authorization systems", "Penetration audits", "Incident response"],
    },
    roadmap: [
      { step: 1, title: "Sniffing & Networks", desc: "Trace network packages patterns, isolate traffic gates, and detect anomalies using Wireshark configurations." },
      { step: 2, title: "Web Vulnerabilities (OWASP)", desc: "Identify SQL injections, sanitize client inputs, and intercept raw requests via Burp Suite proxies." },
      { step: 3, title: "Secure Authentication Gates", desc: "Enforce JWT signature verifications, configure HTTPS SSL networks, and lock cookie access permissions." },
      { step: 4, title: "Penetration Reports", desc: "Perform simulated attacks, compile detailed proof-of-concept reports, and define patches guidelines." },
    ],
    resources: [
      { name: "OWASP Top 10 Web Security Standards", type: "Security Standards" },
      { name: "Burp Suite Interceptor Configurations Guide", type: "Manual" },
      { name: "JSON Web Token (JWT) Signature Verification Docs", type: "Technical Standard" },
    ],
    reviews: [
      { name: "Eric N.", rating: 5, comment: "Best web security roadmap. Burp Suite exercises are extremely realistic." },
      { name: "Laura M.", rating: 4, comment: "Strong input validation segment. Solved my API CORS configuration problems." },
    ],
    related: [
      { id: "devops-engineer", title: "DevOps Engineer" },
      { id: "backend-developer", title: "Backend Developer" },
    ],
    projects: [
      { title: "Penetration Vulnerability Report", diff: "Hard", hours: "20h", stack: ["Burp Suite", "Kali Linux", "OWASP"] },
      { title: "Secure JWT Node Auth Server", diff: "Medium", hours: "12h", stack: ["Node.js", "JWT", "PostgreSQL"] },
    ],
  },
};

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function DetailsPage({ params }: DetailsPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // Fallback to frontend-developer details if key is missing
  const data = detailsDatabase[id] || detailsDatabase["frontend-developer"];

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 bg-radial-[at_50%_0%] from-indigo-950/10 via-neutral-950 to-neutral-950">
      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 font-semibold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Explore Page
          </Link>
        </div>

        {/* Header Block */}
        <div className="border-b border-neutral-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {data.difficulty} Track
              </span>
              <span className="text-neutral-500 font-semibold flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Est: {data.duration}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              {data.title}
            </h1>
          </div>

          <Link
            href="/register"
            className="w-full md:w-auto inline-flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
          >
            Enroll in Path
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 1. OVERVIEW */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-indigo-400" />
            Overview
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/10 border border-neutral-900 p-5 rounded-xl">
            {data.overview}
          </p>
        </section>

        {/* 2. REQUIRED SKILLS */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="h-4 w-4 text-indigo-400" />
            Required Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 space-y-3">
              <h3 className="font-semibold text-neutral-200">Beginner Foundations</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.beginner.map((s: string, idx: number) => (
                  <span key={idx} className="bg-neutral-950 border border-neutral-900 rounded px-2 py-0.5 text-[10px] text-neutral-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 space-y-3">
              <h3 className="font-semibold text-neutral-200">Intermediate Core</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.intermediate.map((s: string, idx: number) => (
                  <span key={idx} className="bg-neutral-950 border border-neutral-900 rounded px-2 py-0.5 text-[10px] text-indigo-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 space-y-3">
              <h3 className="font-semibold text-neutral-200">Advanced Systems</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.advanced.map((s: string, idx: number) => (
                  <span key={idx} className="bg-neutral-950 border border-neutral-900 rounded px-2 py-0.5 text-[10px] text-cyan-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. CAREER ROADMAP TIMELINE */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-indigo-400" />
            Career Roadmap Milestones
          </h2>
          <div className="border-l border-neutral-850 ml-4 space-y-6 text-xs">
            {data.roadmap.map((node: any) => (
              <div key={node.step} className="relative pl-6">
                <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-neutral-950 border border-neutral-800 text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                  {node.step}
                </div>
                <div className="bg-neutral-900/10 border border-neutral-900 p-4 rounded-xl space-y-1">
                  <h4 className="font-semibold text-neutral-200">{node.title}</h4>
                  <p className="text-neutral-500 leading-relaxed">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. AVERAGE SALARY METRICS */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-indigo-400" />
            Average Salary Scale
          </h2>
          <div className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-5 space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-4 border-b border-neutral-900 pb-3">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Entry Level</p>
                <p className="text-sm font-bold text-white mt-0.5">{data.salaryEntry}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Mid Trajectory</p>
                <p className="text-sm font-bold text-cyan-400 mt-0.5">{data.salaryMid}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Senior Target</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">{data.salarySenior}</p>
              </div>
            </div>
            <p className="text-[10px] text-neutral-500">
              *Averages compiled from local startup indexes and global tech telemetry.
            </p>
          </div>
        </section>

        {/* 5. LEARNING RESOURCES CHECKLIST */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            Learning Resources Checkpoints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {data.resources.map((res: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-neutral-905 border border-neutral-900 rounded-xl"
              >
                <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-neutral-250">{res.name}</h4>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-wider mt-0.5">{res.type}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. STUDENT REVIEWS */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="h-4 w-4 text-indigo-400" />
            Student Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {data.reviews.map((rev: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-neutral-300">{rev.name}</span>
                  <div className="flex gap-0.5 text-indigo-400">
                    {Array.from({ length: rev.rating }, (_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-500 italic leading-relaxed">&quot;{rev.comment}&quot;</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. RELATED CAREER PATHS RECOMMENDATION */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider">Related Career Paths</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {data.related.map((rel: any) => (
              <Link
                key={rel.id}
                href={`/roadmaps/${rel.id}`}
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-300 hover:text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <span>{rel.title}</span>
                <ChevronRight className="h-3 w-3 text-neutral-500" />
              </Link>
            ))}
          </div>
        </section>

        {/* 8. RECOMMENDED PROJECTS */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-neutral-450 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-indigo-400" />
            Recommended Projects Checkpoints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {data.projects.map((proj: any, idx: number) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-900 bg-neutral-900/30 p-4 flex flex-col justify-between hover:border-neutral-800 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="bg-neutral-950 border border-neutral-900 text-[9px] font-bold text-indigo-400 px-2 py-0.5 rounded">
                      {proj.diff} Checkpoint
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">{proj.hours} Est</span>
                  </div>
                  <h3 className="font-bold text-white">{proj.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {proj.stack.map((t: string, tIdx: number) => (
                    <span key={tIdx} className="bg-neutral-950 border border-neutral-900 rounded px-1.5 py-0.5 text-[9px] text-neutral-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
