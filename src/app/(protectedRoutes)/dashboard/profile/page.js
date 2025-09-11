import LogOutBtn from "@/components/shared/LogOutBtn";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   return redirect("/login");
  // }

  const { user } = session;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          👤 Profile Info
        </h1>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Name:</strong> {user.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "user"}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
        </div>
        <LogOutBtn />
      </div>
    </div>
  );
}
