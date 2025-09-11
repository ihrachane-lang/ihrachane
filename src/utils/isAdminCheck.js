import { getServerUser } from "@/utils/getServerUser";

export const isAdminCheck = async () => {
  const user = await getServerUser();
  // console.log(user.role);
  if (!user) return false;
  
  return user.role === "admin" || user.role === "super_admin";
};
