import { NextResponse } from "next/server";
import { getDbAdmin } from '@/lib/firebase-admin';

export async function GET(req: Request) {
  const dbAdmin = getDbAdmin();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing job ID" }, { status: 400 });

  const doc = await dbAdmin.collection("newsletterJobs").doc(id).get();
  if (!doc.exists) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  return NextResponse.json(doc.data());
}
