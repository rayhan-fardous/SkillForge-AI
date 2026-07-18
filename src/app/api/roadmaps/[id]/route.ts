import { mongoClient } from "@/lib/auth";
import { NextResponse } from "next/server";

const STATIC_DETAILS: Record<string, any> = {
  "frontend-developer": {
    id: "frontend-developer", type: "static", title: "Frontend Developer",
    overview: "Frontend developers are responsible for implementing the visual and interactive elements of web applications. They bridge the gap between design theory and technical implementation, managing layout structures, responsive behaviors, component state stores, and asset compilation pipelines to guarantee fluid client experiences.",
    difficulty: "Medium", duration: "4 Months", salaryEntry: "$85,000", salaryMid: "$115,000", salarySenior: "$165,000",
    skills: { beginner: ["HTML5 & Semantics","Modern CSS & Flexbox/Grid","ES6+ JavaScript Syntax","Git Branching"], intermediate: ["React 19 Hooks","Tailwind CSS v4 Styling","State Stores (Zustand)","TypeScript Systems"], advanced: ["Next.js App Router","Server Components","CI/CD & Hosting","Performance Optimization"] },
    roadmap: [{step:1,title:"Client Semantics & Layouts",desc:"Construct semantic HTML document trees and responsive CSS page layouts using Flexbox and Grid specifications."},{step:2,title:"Modern Application Logics",desc:"Master asynchronous JavaScript flows, DOM interfaces, API fetch transactions, and package bundling configurations."},{step:3,title:"Component Systems & Styling",desc:"Build isolated React interface views, configure strict TypeScript types, and style with utility Tailwind configurations."},{step:4,title:"Production SSR Directories",desc:"Develop complex Next.js App Router applications, manage server-to-client component bridges, and deploy to serverless edges."}],
    resources: [{name:"Mozilla Developer Network (MDN) Web Docs",type:"Documentation"},{name:"React 19 Official Upgrade Walkthrough",type:"Guide"},{name:"Tailwind CSS v4 Custom `@theme` Guidelines",type:"Reference Docs"},{name:"Next.js App Router Optimization Protocols",type:"Technical Standard"}],
    reviews: [{name:"Sarah L.",rating:5,comment:"The Next.js milestone structure matched corporate expectations perfectly. Excellent path!"},{name:"David K.",rating:4,comment:"Loved the state management checkpoints. Explained Zustand context issues very clearly."}],
    related: [{id:"backend-developer",title:"Backend Developer"},{id:"ai-engineer",title:"AI Engineer"}],
    projects: [{title:"Task Management Board",diff:"Easy",hours:"8h",stack:["React","Tailwind CSS","Zustand"]},{title:"Real-time SSE Traffic Monitor",diff:"Medium",hours:"16h",stack:["Next.js","Recharts","SSE"]}],
  },
  "ai-engineer": {
    id: "ai-engineer", type: "static", title: "AI Engineer",
    overview: "AI engineers build intelligent software applications incorporating large language models, custom vector embeddings, and machine learning structures. They specialize in semantic vector indexing, prompt engineering architectures, and fine-tuning pipelines to establish context-aware systems.",
    difficulty: "Hard", duration: "6 Months", salaryEntry: "$110,000", salaryMid: "$145,000", salarySenior: "$210,000",
    skills: { beginner: ["Python Foundations","NumPy & Pandas analytics","Linear Algebra basics","SQL Datastores"], intermediate: ["PyTorch Core","Vector Embeddings","Semantic Searches","Pinecone Database"], advanced: ["LangChain Pipelines","Agentic Loop Systems","Model Fine-Tuning","API Deployment"] },
    roadmap: [{step:1,title:"Data Manipulation & Analytics",desc:"Master Python data wrangling, SQL joins, database indexes, and statistical analysis tools."},{step:2,title:"Vector Systems & Embeddings",desc:"Generate semantic representation vectors, establish vector indexes, and run Pinecone similarity queries."},{step:3,title:"Retrieval Augmented Generation (RAG)",desc:"Build LangChain pipeline graphs, load PDF context docs, and resolve hallucinations inside prompt structures."},{step:4,title:"Autonomous Engineering Agents",desc:"Establish custom agent loops with tools execution capabilities and host secure containerized inference endpoints."}],
    resources: [{name:"Hugging Face Model Hub Documentation",type:"Reference Hub"},{name:"LangChain Expression Language (LCEL) Manual",type:"Guide"},{name:"Pinecone Vector DB Scale Guidelines",type:"Documentation"},{name:"PyTorch Model Training Protocols",type:"Technical Standard"}],
    reviews: [{name:"Marcus F.",rating:5,comment:"Having the vector databases guides saved me days of searching stackoverflow. Absolutely fantastic."},{name:"Tina R.",rating:5,comment:"Agentic Loop segments are state-of-the-art. Highly recommended if you want to build actual tools."}],
    related: [{id:"data-scientist",title:"Data Scientist"},{id:"devops-engineer",title:"DevOps Engineer"}],
    projects: [{title:"AI Document Summarizer",diff:"Medium",hours:"18h",stack:["Next.js","LangChain","Pinecone"]},{title:"Autonomous QA Dev Agent",diff:"Hard",hours:"36h",stack:["Go","OpenAI APIs","Docker"]}],
  },
  "backend-developer": {
    id: "backend-developer", type: "static", title: "Backend Developer",
    overview: "Backend developers architect the server systems, databases, caching layers, and communication APIs of web applications. They focus on scalability, database indexing efficiency, security configurations, and coordinating asynchronous microservice messages.",
    difficulty: "Medium", duration: "5 Months", salaryEntry: "$90,000", salaryMid: "$120,000", salarySenior: "$175,000",
    skills: { beginner: ["Node.js Core","Express Framework","REST API designs","SQL/PostgreSQL"], intermediate: ["NoSQL (MongoDB)","Redis Caching","Relational Joins & Indexes","TypeScript APIs"], advanced: ["gRPC Protocols","Redis PubSub message queues","Docker containers","AWS deployment"] },
    roadmap: [{step:1,title:"API Designs & Express",desc:"Construct REST endpoints using Express, manage routing tables, and parse JSON requests securely."},{step:2,title:"Database Indexing & Caches",desc:"Master Postgres configurations, create optimal database indexes, and implement Redis cache stores."},{step:3,title:"TypeScript Backend Systems",desc:"Wrap API controllers with strict compile-time types and deploy microservices behind API gateways."},{step:4,title:"Container Deployments",desc:"Dockerize server environments, establish local connection clusters, and host behind load balancers."}],
    resources: [{name:"Node.js Best Practices Repository",type:"Code Guidelines"},{name:"PostgreSQL Query Performance Tuning Guide",type:"Documentation"},{name:"Redis Caching Patterns & Structures",type:"Reference Manual"}],
    reviews: [{name:"Jason W.",rating:5,comment:"The database optimization section is outstanding. Queries execution speed improved immediately."},{name:"Liam G.",rating:4,comment:"Clear, logical transitions. Containerization segment was very helpful."}],
    related: [{id:"frontend-developer",title:"Frontend Developer"},{id:"devops-engineer",title:"DevOps Engineer"}],
    projects: [{title:"Task Manager JSON API",diff:"Easy",hours:"8h",stack:["Express.js","MongoDB","JWT"]},{title:"Distributed WebSockets Server",diff:"Hard",hours:"24h",stack:["Node.js","Redis","WebSockets"]}],
  },
  "devops-engineer": {
    id: "devops-engineer", type: "static", title: "DevOps Engineer",
    overview: "DevOps engineers configure site reliability parameters, containerize applications, and automate continuous delivery pipelines. They manage infrastructure configuration matrices, Kubernetes node clusters, site metrics, and monitoring tools.",
    difficulty: "Hard", duration: "9 Months", salaryEntry: "$100,000", salaryMid: "$135,000", salarySenior: "$195,000",
    skills: { beginner: ["Linux CLI & Bash","Git workflows","Networking concepts","SSH key configs"], intermediate: ["Docker containers","CI/CD (GitHub Actions)","Terraform IaC","Nginx controllers"], advanced: ["Kubernetes Clusters","ArgoCD GitOps","Prometheus Metrics","SRE SLO/SLAs"] },
    roadmap: [{step:1,title:"Linux CLI & Scripting",desc:"Perform complex Linux CLI operations, write Bash automation scripts, and manage networking routes."},{step:2,title:"Continuous Delivery (CI/CD)",desc:"Build automated pipelines validating commits, triggering unit tests, and compiling production builds."},{step:3,title:"Infrastructure as Code (IaC)",desc:"Declare cloud networks dynamically with Terraform scripts, managing modular resources blocks."},{step:4,title:"Kubernetes Deployments",desc:"Scale replica containers inside local pods, coordinate services network gates, and monitor visual graphs."}],
    resources: [{name:"Kubernetes Official Interactive Documentation",type:"Reference manual"},{name:"Terraform Providers Configuration Guides",type:"Documentation"},{name:"Prometheus Monitoring Alerts Recipes",type:"Guide"}],
    reviews: [{name:"Chris H.",rating:5,comment:"The ArgoCD GitOps sequence is state-of-the-art. Highly professional material."},{name:"Dora B.",rating:5,comment:"Extremely thorough. Handled Terraform workspace configurations perfectly."}],
    related: [{id:"ai-engineer",title:"AI Engineer"},{id:"cyber-security-engineer",title:"Cyber Security Engineer"}],
    projects: [{title:"K8s ArgoCD Pipeline",diff:"Hard",hours:"30h",stack:["Kubernetes","ArgoCD","Helm"]},{title:"Modular AWS Terraform Setup",diff:"Medium",hours:"14h",stack:["Terraform","AWS","Nginx"]}],
  },
  "data-scientist": {
    id: "data-scientist", type: "static", title: "Data Scientist",
    overview: "Data Scientists combine statistical reasoning, mathematical modeling, and programming systems to analyze complex data records and construct predictive systems. They clean raw data pipelines, train machine learning classifiers, and build analytical insight displays.",
    difficulty: "Medium", duration: "6 Months", salaryEntry: "$95,000", salaryMid: "$130,000", salarySenior: "$180,000",
    skills: { beginner: ["Python core syntax","Jupyter Notebooks","SQL relational databases","Git tracking"], intermediate: ["Pandas structures","Data visual graphings","Numpy operations","Matplotlib charts"], advanced: ["Scikit-Learn ML","Feature engineering","Classic ML classifiers","Statistical hypotheses"] },
    roadmap: [{step:1,title:"Data Wrangling & SQL",desc:"Ingest scattered database files, write SQL queries, and sanitize unstructured dataset values."},{step:2,title:"Visual Analytics",desc:"Generate statistical data distributions, isolate key correlations, and compile graphs using Seaborn."},{step:3,title:"Statistical Hypothesis",desc:"Run hypothesis models, calculate value distributions, and design experiments to validate data patterns."},{step:4,title:"Machine Learning Models",desc:"Train regression classifiers, analyze confusion matrix scores, and deploy prediction models via APIs."}],
    resources: [{name:"Pandas Data Analytics Reference Manual",type:"Documentation"},{name:"Scikit-Learn Classifiers Tutorials",type:"Guide"},{name:"Jupyter Notebook Deployment Guide",type:"Standard Docs"}],
    reviews: [{name:"Alan T.",rating:4,comment:"Very good statistics review. Help me clean messy arrays much faster."},{name:"Clara S.",rating:5,comment:"Feature engineering lessons are excellent. Solved my ML validation issues."}],
    related: [{id:"ai-engineer",title:"AI Engineer"},{id:"backend-developer",title:"Backend Developer"}],
    projects: [{title:"Predictive Analytics API",diff:"Medium",hours:"20h",stack:["Python","FastAPI","Scikit-Learn"]},{title:"Interactive Housing Data Dashboard",diff:"Easy",hours:"10h",stack:["React","Recharts","SQL"]}],
  },
  "cyber-security-engineer": {
    id: "cyber-security-engineer", type: "static", title: "Cyber Security Engineer",
    overview: "Cybersecurity engineers audit application systems, run vulnerability scans, identify security leaks, and configure authorization gates. They analyze vulnerability templates (OWASP Top 10), defend against active scripts injection (XSS), and formulate secure networks rules.",
    difficulty: "Hard", duration: "7 Months", salaryEntry: "$95,000", salaryMid: "$125,000", salarySenior: "$185,000",
    skills: { beginner: ["Linux bash shell","Networking gates & ports","TCP/IP models","Wireshark sniffing"], intermediate: ["OWASP vulnerabilities","Burp Suite interceptor","SQL injection scripts","XSS preventions"], advanced: ["JWT secure validations","OAuth authorization systems","Penetration audits","Incident response"] },
    roadmap: [{step:1,title:"Sniffing & Networks",desc:"Trace network packages patterns, isolate traffic gates, and detect anomalies using Wireshark configurations."},{step:2,title:"Web Vulnerabilities (OWASP)",desc:"Identify SQL injections, sanitize client inputs, and intercept raw requests via Burp Suite proxies."},{step:3,title:"Secure Authentication Gates",desc:"Enforce JWT signature verifications, configure HTTPS SSL networks, and lock cookie access permissions."},{step:4,title:"Penetration Reports",desc:"Perform simulated attacks, compile detailed proof-of-concept reports, and define patches guidelines."}],
    resources: [{name:"OWASP Top 10 Web Security Standards",type:"Security Standards"},{name:"Burp Suite Interceptor Configurations Guide",type:"Manual"},{name:"JSON Web Token (JWT) Signature Verification Docs",type:"Technical Standard"}],
    reviews: [{name:"Eric N.",rating:5,comment:"Best web security roadmap. Burp Suite exercises are extremely realistic."},{name:"Laura M.",rating:4,comment:"Strong input validation segment. Solved my API CORS configuration problems."}],
    related: [{id:"devops-engineer",title:"DevOps Engineer"},{id:"backend-developer",title:"Backend Developer"}],
    projects: [{title:"Penetration Vulnerability Report",diff:"Hard",hours:"20h",stack:["Burp Suite","Kali Linux","OWASP"]},{title:"Secure JWT Node Auth Server",diff:"Medium",hours:"12h",stack:["Node.js","JWT","PostgreSQL"]}],
  },
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const db = mongoClient.db("SkillForge-AI");
    const col = db.collection("roadmaps");

    // Seed static detail into DB on first access
    if (STATIC_DETAILS[id]) {
      const exists = await col.findOne({ id, type: "static" });
      if (!exists) {
        await col.insertOne(STATIC_DETAILS[id]);
      }
    }

    const roadmap = await col.findOne({ id });

    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    const { _id, type, ...roadmapData } = roadmap as any;
    return NextResponse.json(roadmapData);
  } catch (error: any) {
    if (STATIC_DETAILS[id]) {
      const { type, ...data } = STATIC_DETAILS[id];
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
