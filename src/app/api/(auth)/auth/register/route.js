import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password, agreeToTerms } = body;
    if (!name || !email || !password || !agreeToTerms) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      if (!existingUser.verified) {
        return NextResponse.json(
          { error: "User already exists. Please verify your Account!" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "User already exists!!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.HASH_SALT_ROUND)
    );

    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      agreeToTerms,
    });

    const newUser = await user.save();
    const {
      password: removePassword,
      verifyToken,
      verifyTokenExpire,
      resetToken,
      resetTokenExpire,
      ...rest
    } = newUser._doc;

    // Send verification email
    await sendEmail(name, email, "verify-email");

    return NextResponse.json(
      {
        message:
          "User created successfully. Please check your email for verification.",
        data: rest,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Registration failed." }), {
      status: 500,
    });
  }
}
