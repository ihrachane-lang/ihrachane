"use client";
import ClientTable from "@/components/dashboard/client/ClientTable";
import { useRouter } from "next/navigation";

const ClientPage = () => {
  const router = useRouter();
  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='text-end py-3'>
          <button
            onClick={() => router.push("/dashboard/client/create-new")}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] cursor-pointer'>
            Add Client
          </button>
        </div>
        <ClientTable />
      </div>
    </div>
  );
};

export default ClientPage;
