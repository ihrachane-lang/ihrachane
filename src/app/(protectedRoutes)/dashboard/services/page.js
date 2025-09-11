"use client";
import ServiceTable from "@/components/dashboard/services/ServiceTable";
import { useRouter } from "next/navigation";

const ServicesPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='text-end py-3'>
          <button
            onClick={() => router.push("/dashboard/services/create-new")}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] cursor-pointer'>
            Add Service
          </button>
        </div>
      </div>
      <ServiceTable />
    </div>
  );
};

export default ServicesPage;
