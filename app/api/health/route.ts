import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ status: "error", message: "Database connection failed" }, { status: 500 });
    }
    console.log("Database connection established successfully", db);

    return NextResponse.json({ status: "connected", message: "Database is connected" }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}
