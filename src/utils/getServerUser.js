import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function getServerUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return session.user;
}
