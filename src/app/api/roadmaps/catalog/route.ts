import { mongoClient } from "@/lib/auth";
import { NextResponse } from "next/server";

const STATIC_CATALOG = [
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

export async function GET() {
  try {
    const db = mongoClient.db("SkillForge-AI");
    const col = db.collection("roadmap_catalog");

    // Seed static entries if collection is empty
    const count = await col.countDocuments({ type: "static" });
    if (count === 0) {
      await col.insertMany(STATIC_CATALOG.map((r) => ({ ...r, type: "static" })));
    }

    const docs = await col
      .find({ type: "static" }, { projection: { _id: 0, type: 0 } })
      .toArray();

    return NextResponse.json(docs);
  } catch {
    // Fallback to in-memory if DB unavailable
    return NextResponse.json(STATIC_CATALOG);
  }
}
