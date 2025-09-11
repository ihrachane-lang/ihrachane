import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  const { resetCode, email, newPassword } = await req.json();
  if (!resetCode || !email || !newPassword) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await dbConnect();
  const user = await User.findOne({ email });

  if (
    !user ||
    !user.resetToken ||
    Date.now() > new Date(user.resetTokenExpire).getTime()
  )
    return NextResponse.json(
      { error: "Invalid or expired code!" },
      { status: 400 }
    );

  const match = await bcrypt.compare(resetCode, user.resetToken);
  if (!match)
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });

  const passwordIsMatch = await bcrypt.compare(
    newPassword,
    user?.password || ""
  );
  if (passwordIsMatch) {
    return NextResponse.json(
      { error: "New password must be different from the old password" },
      { status: 400 }
    );
  }

  user.password = await bcrypt.hash(
    newPassword,
    Number(process.env.HASH_SALT_ROUND)
  );
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  user.resetHashedEmail = undefined;
  await user.save();

  return NextResponse.json({
    message: "Password reset successful",
    status: 200,
  });
}
