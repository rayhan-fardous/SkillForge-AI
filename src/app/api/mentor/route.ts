import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Google retires dated Gemini model IDs. This alias tracks the current Flash model.
const MODEL = "gemini-flash-latest";
const MAX_MESSAGE_LENGTH = 4_000;

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Please sign in to use the AI Mentor." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    const message = typeof body === "object" && body !== null && "message" in body
      ? (body as { message?: unknown }).message
      : undefined;

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "A message is required." }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Please keep messages under 4,000 characters." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "The AI Mentor is not configured. Add GEMINI_API_KEY to the server environment." }, { status: 503 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are SkillForge AI Mentor, a helpful technical mentor. Give accurate, practical, concise answers. Explain trade-offs and include short code examples only when useful. Do not claim to have executed code or accessed systems you cannot access." }],
          },
          contents: [{ role: "user", parts: [{ text: message.trim() }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 1024 },
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Gemini mentor request failed:", response.status, details);
      return NextResponse.json({ error: "The AI Mentor could not respond right now. Please try again shortly." }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: unknown }) => typeof part.text === "string" ? part.text : "")
      .join("")
      .trim();

    if (!reply) {
      return NextResponse.json({ error: "The AI Mentor returned an empty response. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI Mentor request failed:", error);
    return NextResponse.json({ error: "Unable to process that request. Please try again." }, { status: 500 });
  }
}
