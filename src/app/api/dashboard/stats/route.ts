import { auth, mongoClient } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Helper: get Mon–Sun boundaries for the current week (UTC)
function getCurrentWeekBounds() {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun, 1=Mon, …
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diffToMonday);
  monday.setUTCHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999);
  return { monday, sunday };
}

// Day labels Mon–Sun
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const db = mongoClient.db("SkillForge-AI");
  const goalsCollection = db.collection("goals");
  const userStatsCollection = db.collection("user_stats");

  try {
    // ── 1. Fetch all goals for user ──────────────────────────────────────────
    const allGoals = await goalsCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const totalGoals = allGoals.length;
    const completedGoals = allGoals.filter((g) => g.completed).length;
    const inProgressGoals = allGoals.filter(
      (g) => !g.completed && g.progress > 0
    ).length;

    // ── 2. Derive active track from most common `source` ────────────────────
    const sourceCounts: Record<string, number> = {};
    for (const g of allGoals) {
      const src: string = g.source || "Custom Objective";
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    }
    let activeTrack = "No active track";
    let activeTrackPhase = "Add a goal to get started";
    if (Object.keys(sourceCounts).length > 0) {
      activeTrack = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0][0];
      // Count in-progress goals under this track as "phase"
      const trackInProgress = allGoals.filter(
        (g) => g.source === activeTrack && !g.completed
      ).length;
      const trackTotal = sourceCounts[activeTrack];
      activeTrackPhase =
        trackInProgress > 0
          ? `${trackTotal - trackInProgress}/${trackTotal} milestones done`
          : `All ${trackTotal} milestone${trackTotal > 1 ? "s" : ""} complete`;
    }

    // ── 3. Weekly activity chart (Mon–Sun) ──────────────────────────────────
    const { monday, sunday } = getCurrentWeekBounds();

    // Goals created or updated this week act as activity proxy (0.5h each)
    const weekGoals = allGoals.filter((g) => {
      const date: Date = g.updatedAt
        ? new Date(g.updatedAt)
        : g.createdAt
        ? new Date(g.createdAt)
        : new Date(0);
      return date >= monday && date <= sunday;
    });

    // Build per-day accumulator (index 0=Mon … 6=Sun)
    const dayHours = [0, 0, 0, 0, 0, 0, 0];
    for (const g of weekGoals) {
      const date: Date = g.updatedAt
        ? new Date(g.updatedAt)
        : g.createdAt
        ? new Date(g.createdAt)
        : new Date(0);
      const utcDay = date.getUTCDay(); // 0=Sun
      const idx = utcDay === 0 ? 6 : utcDay - 1; // Mon=0 … Sun=6
      dayHours[idx] = parseFloat((dayHours[idx] + 0.5).toFixed(1));
    }

    const weeklyActivity = DAY_LABELS.map((name, i) => ({
      name,
      hours: dayHours[i],
    }));

    const totalWeeklyHours = dayHours.reduce((s, h) => s + h, 0);

    // Weekly date range label (e.g. "Jul 14 - Jul 20")
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const weekLabel = `${fmt(monday)} - ${fmt(sunday)}`;

    // ── 4. Mentor query balance (stored in user_stats) ──────────────────────
    const QUERY_LIMIT = 50;
    const RESET_DAYS = 7;

    let statDoc = await userStatsCollection.findOne({ userId });

    if (!statDoc) {
      // Seed on first access
      const now = new Date();
      await userStatsCollection.insertOne({
        userId,
        mentorQueriesRemaining: QUERY_LIMIT,
        lastReset: now,
        createdAt: now,
      });
      statDoc = { mentorQueriesRemaining: QUERY_LIMIT, lastReset: new Date() };
    } else {
      // Auto-reset every RESET_DAYS days
      const lastReset = new Date(statDoc.lastReset);
      const daysSinceReset =
        (Date.now() - lastReset.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceReset >= RESET_DAYS) {
        const now = new Date();
        await userStatsCollection.updateOne(
          { userId },
          {
            $set: {
              mentorQueriesRemaining: QUERY_LIMIT,
              lastReset: now,
            },
          }
        );
        statDoc.mentorQueriesRemaining = QUERY_LIMIT;
        statDoc.lastReset = now;
      }
    }

    const mentorQueriesRemaining: number =
      statDoc.mentorQueriesRemaining ?? QUERY_LIMIT;
    const lastReset = new Date(statDoc.lastReset);
    const nextReset = new Date(lastReset);
    nextReset.setDate(lastReset.getDate() + RESET_DAYS);
    const daysUntilReset = Math.max(
      0,
      Math.ceil((nextReset.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );

    // ── 5. Top 3 milestones for dashboard (in-progress first, then pending) ─
    const sortedGoals = [...allGoals].sort((a, b) => {
      // Priority: in-progress > not started > completed
      const priority = (g: any) =>
        !g.completed && g.progress > 0
          ? 0
          : !g.completed
          ? 1
          : 2;
      return priority(a) - priority(b);
    });

    const topMilestones = sortedGoals.slice(0, 3).map((g) => ({
      id: g._id.toString(),
      title: g.title,
      path: g.source || "Custom Objective",
      status: g.completed
        ? "Completed"
        : g.progress > 0
        ? "In Progress"
        : "Pending",
      progress: g.progress ?? 0,
      dueDate: g.dueDate || "N/A",
    }));

    return NextResponse.json({
      activeTrack,
      activeTrackPhase,
      totalGoals,
      completedGoals,
      inProgressGoals,
      weeklyActivity,
      totalWeeklyHours: parseFloat(totalWeeklyHours.toFixed(1)),
      weekLabel,
      mentorQueriesRemaining,
      daysUntilReset,
      topMilestones,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
