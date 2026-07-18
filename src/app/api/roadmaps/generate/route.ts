import { auth, mongoClient } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { interest, difficulty, commitment, duration, focus } = body;

    if (!interest) {
      return NextResponse.json({ error: "Career Interest/Goal is required" }, { status: 400 });
    }

    let generatedRoadmap: any = null;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Call Gemini API to generate personalized roadmap
      const prompt = `You are an expert technical curriculum designer. Generate a personalized, highly structured learning roadmap in JSON format for a student with the following profile:
- Career Interest/Goal: "${interest}"
- Skill Level: "${difficulty}"
- Weekly Time Commitment: "${commitment}"
- Target Duration: "${duration}"
- Primary Focus: "${focus}"

Return ONLY a valid JSON object matching this TypeScript interface. Do NOT wrap the JSON in markdown code blocks like \\\`\\\`\\\`json:
interface GeneratedRoadmap {
  title: string;
  overview: string;
  difficulty: string;
  duration: string;
  skills: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  roadmap: {
    step: number;
    title: string;
    desc: string;
  }[];
  projects: {
    title: string;
    diff: string;
    hours: string;
    stack: string[];
  }[];
  resources: {
    name: string;
    type: string;
  }[];
}

Ensure all lists and steps are highly customized to the student's exact goal ("${interest}").`;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (response.ok) {
          const resData = await response.json();
          const jsonText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) {
            generatedRoadmap = JSON.parse(jsonText.trim());
          }
        }
      } catch (err) {
        console.error("Gemini API call failed, using mock fallback...", err);
      }
    }

    // Fallback Mock Generator if Gemini API key is missing or failed
    if (!generatedRoadmap) {
      generatedRoadmap = generateMockRoadmap(interest, difficulty, duration, commitment, focus);
    }

    // Save to database
    const db = mongoClient.db("SkillForge-AI");
    const roadmapsCollection = db.collection("roadmaps");

    const customId = `ai-roadmap-${crypto.randomBytes(6).toString("hex")}`;
    const roadmapDoc = {
      id: customId,
      userId: session.user.id,
      title: generatedRoadmap.title || `AI Personalized Path: ${interest}`,
      overview: generatedRoadmap.overview || `Custom educational path designed for mastering ${interest}.`,
      difficulty: generatedRoadmap.difficulty || difficulty,
      duration: generatedRoadmap.duration || duration,
      skills: generatedRoadmap.skills || {
        beginner: [`Core ${interest} basics`, "Fundamental tools"],
        intermediate: ["Application lifecycle", "System integration"],
        advanced: ["Optimization", "Production deployments"],
      },
      roadmap: generatedRoadmap.roadmap || [
        { step: 1, title: "Fundamentals and Concept Mapping", desc: `Establish essential core parameters of ${interest}.` },
        { step: 2, title: "Structured Core Implementation", desc: "Build functional application pipelines and coordinate services." },
        { step: 3, title: "Advanced Architectures and Scale", desc: "Integrate vector stores, deploy caching mechanisms, and configure CI/CD pipelines." },
      ],
      projects: generatedRoadmap.projects || [
        { title: `${interest} Core Prototype`, diff: "Easy", hours: "10h", stack: ["Modern Framework", "SQLite"] },
        { title: `Distributed ${interest} Application`, diff: "Hard", hours: "30h", stack: ["Node.js", "Docker", "MongoDB"] },
      ],
      resources: generatedRoadmap.resources || [
        { name: `Official ${interest} Reference Documentation`, type: "Documentation" },
        { name: `${interest} Production Deployment Guide`, type: "Guide" },
      ],
      createdAt: new Date(),
    };

    await roadmapsCollection.insertOne(roadmapDoc);

    return NextResponse.json({ id: customId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateMockRoadmap(
  interest: string,
  difficulty: string,
  duration: string,
  commitment: string,
  focus: string
) {
  // Simple NLP parser to generate high-quality mocks
  const isFrontend = interest.toLowerCase().includes("front") || interest.toLowerCase().includes("react") || interest.toLowerCase().includes("web");
  const isAI = interest.toLowerCase().includes("ai") || interest.toLowerCase().includes("ml") || interest.toLowerCase().includes("vector") || interest.toLowerCase().includes("model");

  if (isFrontend) {
    return {
      title: `AI Personalized Roadmap for ${interest}`,
      overview: `This AI-generated track is designed specifically to help you build modern front-end application architectures. Focused on "${focus}" at a "${difficulty}" level, with a schedule fit for "${commitment}" over "${duration}".`,
      difficulty,
      duration,
      skills: {
        beginner: ["HTML5 Structures", "CSS Layouts (Grid/Flexbox)", "ES6+ JS & DOM API"],
        intermediate: ["React Components & Hooks", "State Management (Zustand)", "TypeScript Typing"],
        advanced: ["Next.js App Routing", "Dynamic Data Fetching", "Vercel Edge Deployment"],
      },
      roadmap: [
        { step: 1, title: "Syntax Foundations & Layouts", desc: "Learn modern semantical layout models, styling frameworks, and client logics." },
        { step: 2, title: "Component States & Actions", desc: "Formulate functional React application trees and configure async fetch contexts." },
        { step: 3, title: "Next.js SSR Rendering Pipelines", desc: "Coordinate server-to-client component barriers and optimize SEO layouts." },
      ],
      projects: [
        { title: "Dynamic Task Board", diff: "Easy", hours: "12h", stack: ["React", "Zustand", "CSS"] },
        { title: "Personal E-Commerce Dashboard", diff: "Medium", hours: "24h", stack: ["Next.js", "Tailwind CSS", "REST API"] },
      ],
      resources: [
        { name: "MDN Web Docs: CSS Layouts", type: "Documentation" },
        { name: "React 19 Official Documentation", type: "Manual" },
      ],
    };
  } else if (isAI) {
    return {
      title: `AI Personalized Roadmap for ${interest}`,
      overview: `Establish custom vector databases, retrieval chains, and transformer fine-tuning models. Designed specifically for "${focus}" at a "${difficulty}" level for "${commitment}" over "${duration}".`,
      difficulty,
      duration,
      skills: {
        beginner: ["Python Scripting", "NumPy & Pandas Structures", "SQL Basics"],
        intermediate: ["Vector Embeddings", "Pinecone/Chroma Databases", "RAG Pipeline Logic"],
        advanced: ["LangChain & Agentic Loops", "Model Evaluation Protocols", "Hugging Face APIs"],
      },
      roadmap: [
        { step: 1, title: "Python Analytics and SQL", desc: "Query databases, perform data cleaning metrics, and build simple analytical models." },
        { step: 2, title: "Vector Databases & Semantics", desc: "Convert textual data into high-dimensional vector representations and index in Pinecone." },
        { step: 3, title: "LangChain Agent Systems", desc: "Establish complex retrieval chains that enable AI agents to execute local commands and query APIs." },
      ],
      projects: [
        { title: "Context-Aware PDF Chatbot", diff: "Medium", hours: "18h", stack: ["Next.js", "LangChain", "Pinecone"] },
        { title: "Autonomous Dev Helper Agent", diff: "Hard", hours: "36h", stack: ["Python", "FastAPI", "Docker"] },
      ],
      resources: [
        { name: "Hugging Face Models Hub Guide", type: "Reference" },
        { name: "LangChain Expression Language (LCEL) Manual", type: "Documentation" },
      ],
    };
  } else {
    // Generic fallback mock
    return {
      title: `AI Personalized Roadmap for ${interest}`,
      overview: `A customized roadmap tailored for mastering ${interest}. Optimized for a ${difficulty} curriculum focusing on ${focus}, scheduled for ${commitment} over ${duration}.`,
      difficulty,
      duration,
      skills: {
        beginner: [`Fundamental concepts of ${interest}`, "Basic syntax & CLI tools", "Git version control"],
        intermediate: ["System APIs and modular libraries", "Datastore configurations", "Error logging and handling"],
        advanced: ["Scale architectures", "Security and identity protocols", "Containerization & Cloud hosting"],
      },
      roadmap: [
        { step: 1, title: `Phase 1: ${interest} Foundations`, desc: `Understand core building blocks, configuration paradigms, and command execution.` },
        { step: 2, title: `Phase 2: Core Development & APIs`, desc: "Implement functional services pipelines, handle authentication gates, and connect to datastores." },
        { step: 3, title: `Phase 3: Security & Deployment`, desc: "Secure endpoints, set up Docker container environments, and deploy pipelines to production servers." },
      ],
      projects: [
        { title: `${interest} Base Prototype`, diff: "Easy", hours: "10h", stack: ["Core Languages", "Git"] },
        { title: `${interest} Secure Enterprise App`, diff: "Hard", hours: "28h", stack: ["Container Configs", "Database Caches", "OAuth"] },
      ],
      resources: [
        { name: `Official ${interest} Reference Guides`, type: "Documentation" },
        { name: "Enterprise Architecture Patterns Guide", type: "Technical Reference" },
      ],
    };
  }
}
