"use client";

import { useEffect, useState } from "react";
import { FiUsers, FiShoppingBag } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { RiServiceLine } from "react-icons/ri";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaHandshake } from "react-icons/fa";
import Loading from "@/components/loading/Loading";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </div>
  );
};

const DashboardSummary = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/summary/statistics");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch statistics");
        }

        setStats(data.data);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        <p>Error: {error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const { counts, sourcingRequestsByStatus, monthlyStats } = stats;

  // Prepare data for pie chart
  const pieData = [
    {
      name: "Pending",
      value: sourcingRequestsByStatus.pending,
      color: "#FBBF24",
    },
    {
      name: "In Progress",
      value: sourcingRequestsByStatus.inProgress,
      color: "#3B82F6",
    },
    {
      name: "Completed",
      value: sourcingRequestsByStatus.done,
      color: "#10B981",
    },
    {
      name: "Cancelled",
      value: sourcingRequestsByStatus.cancelled,
      color: "#EF4444",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={counts.users}
          icon={<FiUsers className="text-blue-500 text-xl" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Total Clients"
          value={counts.clients}
          icon={<BsBuilding className="text-purple-500 text-xl" />}
          color="bg-purple-50"
        />
        <StatCard
          title="Total Partners"
          value={counts.partners}
          icon={<FaHandshake className="text-green-500 text-xl" />}
          color="bg-green-50"
        />
        <StatCard
          title="Total Services"
          value={counts.services}
          icon={<RiServiceLine className="text-yellow-500 text-xl" />}
          color="bg-yellow-50"
        />
        <StatCard
          title="Categories"
          value={counts.categories}
          icon={<BiCategory className="text-indigo-500 text-xl" />}
          color="bg-indigo-50"
        />
        <StatCard
          title="Sub-Categories"
          value={counts.subCategories}
          icon={<BiCategory className="text-pink-500 text-xl" />}
          color="bg-pink-50"
        />
        <StatCard
          title="Testimonials"
          value={counts.testimonials}
          icon={<MdOutlineRateReview className="text-orange-500 text-xl" />}
          color="bg-orange-50"
        />
        <StatCard
          title="Sourcing Requests"
          value={counts.sourcingRequests}
          icon={<FiShoppingBag className="text-red-500 text-xl" />}
          color="bg-red-50"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Sourcing Requests */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Sourcing Requests
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sourcing Requests Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Sourcing Requests Status
          </h3>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sourcing Requests */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Sourcing Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentSourcingRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {request.company}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          request.productRequirements.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.productRequirements.status ===
                              "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : request.productRequirements.status === "done"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.productRequirements.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Contact Messages
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentContactMessages.map((message) => (
                  <tr key={message._id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {message.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {message.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
