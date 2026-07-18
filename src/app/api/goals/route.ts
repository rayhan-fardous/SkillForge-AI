import { auth, mongoClient } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET active goals for current student
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const db = mongoClient.db("SkillForge-AI");
  const goalsCollection = db.collection("goals");

  try {
    const goals = await goalsCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    // Map _id to string ID for easier React integration
    const mappedGoals = goals.map((g) => ({
      id: g._id.toString(),
      title: g.title,
      source: g.source || "Custom Objective",
      progress: g.progress ?? (g.completed ? 100 : 0),
      completed: g.completed ?? false,
      dueDate: g.dueDate || "N/A",
    }));

    return NextResponse.json(mappedGoals);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create learning goal
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const db = mongoClient.db("SkillForge-AI");
  const goalsCollection = db.collection("goals");

  try {
    const body = await request.json();
    const { title, source, dueDate } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newGoal = {
      userId,
      title,
      source: source || "Custom Objective",
      completed: false,
      progress: 0,
      dueDate: dueDate || "N/A",
      createdAt: new Date(),
    };

    const result = await goalsCollection.insertOne(newGoal);

    return NextResponse.json({
      id: result.insertedId.toString(),
      ...newGoal,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update goal progress/completion
export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = mongoClient.db("SkillForge-AI");
  const goalsCollection = db.collection("goals");

  try {
    const body = await request.json();
    const { id, completed, progress } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateFields: any = {};
    if (completed !== undefined) {
      updateFields.completed = completed;
      updateFields.progress = completed ? 100 : 0;
    }
    if (progress !== undefined) {
      updateFields.progress = progress;
      updateFields.completed = progress === 100;
    }

    const result = await goalsCollection.updateOne(
      { _id: new ObjectId(id as string), userId: session.user.id },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE learning goal
export async function DELETE(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = mongoClient.db("SkillForge-AI");
  const goalsCollection = db.collection("goals");

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await goalsCollection.deleteOne({
      _id: new ObjectId(id as string),
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
