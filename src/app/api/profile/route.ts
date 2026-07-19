import { auth, mongoClient } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// ── GET: Return full profile data (session + extended fields) ─────────────────
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const db = mongoClient.db("SkillForge-AI");
  const userStatsCollection = db.collection("user_stats");

  try {
    // Fetch extended profile fields from user_stats
    const statsDoc = await userStatsCollection.findOne({ userId });

    // Read fresh user data directly from the `user` collection so name/avatar
    // changes made via updateUser() are reflected immediately without waiting
    // for the session cookie to rotate.
    const userDoc = await db.collection("user").findOne({ id: userId });

    return NextResponse.json({
      id: userId,
      name: userDoc?.name ?? session.user.name,
      email: session.user.email,
      role: (session.user as any).role || "student",
      avatar:
        userDoc?.image ??
        session.user.image ??
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      careerGoal: statsDoc?.careerGoal || "",
      bio: statsDoc?.bio || "",
      location: statsDoc?.location || "",
      website: statsDoc?.website || "",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── PUT: Update name/avatar via better-auth API + extended fields in user_stats
export async function PUT(request: Request) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const db = mongoClient.db("SkillForge-AI");

  try {
    const body = await request.json();
    const { name, careerGoal, bio, location, website, avatar } = body;

    // Validate name length
    if (name !== undefined && (!name || name.trim().length < 2)) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    // ── 1. Update name & image via better-auth's own updateUser API ───────────
    //    This is the correct way — it keeps better-auth's internal state
    //    consistent and works regardless of how the adapter stores the user.
    const updatePayload: Record<string, string> = {};
    if (name && name.trim()) updatePayload.name = name.trim();
    if (avatar && avatar.trim()) updatePayload.image = avatar.trim();

    if (Object.keys(updatePayload).length > 0) {
      await auth.api.updateUser({
        headers: reqHeaders,
        body: updatePayload,
      });
    }

    // ── 2. Upsert extended fields in user_stats ───────────────────────────────
    const statsUpdateFields: Record<string, any> = { updatedAt: new Date() };
    if (careerGoal !== undefined) statsUpdateFields.careerGoal = careerGoal;
    if (bio !== undefined) statsUpdateFields.bio = (bio as string).trim();
    if (location !== undefined) statsUpdateFields.location = (location as string).trim();
    if (website !== undefined) statsUpdateFields.website = (website as string).trim();

    await db.collection("user_stats").updateOne(
      { userId },
      {
        $set: statsUpdateFields,
        $setOnInsert: { userId, createdAt: new Date() },
      },
      { upsert: true }
    );

    // Return the confirmed saved name (read fresh from DB) so the client can
    // update its local state accurately.
    const updatedUser = await db.collection("user").findOne({ id: userId });

    return NextResponse.json({
      success: true,
      name: updatedUser?.name ?? name?.trim() ?? session.user.name,
      avatar: updatedUser?.image ?? avatar?.trim() ?? session.user.image,
      careerGoal: careerGoal ?? "",
    });
  } catch (error: any) {
    console.error("[PUT /api/profile] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
