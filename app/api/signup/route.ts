import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Input validation
    if (!name || name.length < 2 || name.length > 50) {
      return NextResponse.json(
        { error: "Name must be between 2 and 50 characters long" },
        { status: 400 }
      );
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await connectDB();

    // Count user if more than 1, return error
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json(
        { error: "System allow only 1 user signup." },
        { status: 409 }
      );
    }

    // Check duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 } // Conflict
      );
    }

    // Generate salt
    const salt = randomBytes(16).toString("hex");

    // Combine salt with password before bcrypt
    const saltedPassword = password + salt;
    const passwordHash = await bcrypt.hash(saltedPassword, 12);

    // Save user
    const newUser = new User({
      name,
      email,
      passwordHash: passwordHash,
      salt,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
