# SkillForge AI

**SkillForge AI** is an AI-powered learning and career-planning platform that helps aspiring developers discover career paths, create personalized learning roadmaps, manage milestones, and track progress in one focused workspace.

## Live Demo

Explore the deployed application: [skillforge-ai-lime.vercel.app](https://skillforge-ai-lime.vercel.app)

## Highlights

- **Personalized AI roadmaps** — Generate structured learning plans tailored to a career goal, experience level, time commitment, duration, and learning focus.
- **Career-path exploration** — Browse curated paths for roles such as Frontend Developer, Backend Developer, and AI Engineer.
- **Learning-goal management** — Create, update, complete, and organize milestones for each learning journey.
- **Progress dashboard** — Review active tracks, weekly activity, milestones, goal completion, and AI mentor usage in a single view.
- **AI mentor experience** — Get contextual support while moving through a learning plan.
- **Secure accounts** — Supports email/password authentication and Google OAuth through Better Auth.
- **Persistent data** — Stores user profiles, roadmaps, goals, and progress data in MongoDB.

## Technology

| Area | Tools |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Styling & UI | Tailwind CSS 4, HeroUI, Framer Motion, Lucide |
| Forms & validation | React Hook Form, Zod |
| Authentication | Better Auth with MongoDB adapter |
| Database | MongoDB |
| AI roadmap generation | Google Gemini API (with a local fallback generator) |
| Data visualization | Recharts |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB database
- Google OAuth credentials (optional, for Google sign-in)
- A Gemini API key (optional; roadmap generation falls back to built-in sample logic when unavailable)

### Installation

```bash
git clone <your-repository-url>
cd frontend
npm install
```

Create a `.env` file in the project root:

```env
BETTER_AUTH_SECRET=your-secure-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your-mongodb-connection-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=your-gemini-api-key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Runs the production server after building. |
| `npm run lint` | Runs ESLint checks. |

## Project Structure

```text
src/
├── app/                 # Pages, layouts, and API routes
│   ├── api/             # Authentication, goals, dashboard, and roadmap endpoints
│   └── roadmaps/        # Roadmap discovery, generation, and detail pages
├── components/          # Shared interface components
├── context/             # Application-wide React context
└── lib/                 # Authentication and validation utilities
```

## Deployment

The application is deployed on Vercel and available at [https://skillforge-ai-lime.vercel.app](https://skillforge-ai-lime.vercel.app). Configure the same environment variables from `.env` in your deployment provider before publishing.

## License

This project is intended for educational and portfolio use. Add a license file if you plan to distribute or reuse it publicly.
