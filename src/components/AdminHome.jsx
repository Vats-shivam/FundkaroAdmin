"use client"

import { useState, useEffect } from "react"
// import axios from 'axios'; // COMMENTED OUT - Backend integration
import { Pie, Bar } from "react-chartjs-2"
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  LineElement,
  PointElement,
  LinearScale,
} from "chart.js"

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  LineElement,
  PointElement,
  LinearScale,
)
import StatsCard from "./StatsCard"

// Dummy stats data
const DUMMY_STATS = {
  totalUsers: 1250,
  totalExpoTokens: 890,
  totalApplications: 456,
  mobileUsersPercentage: 71,
  applicationStatusData: {
    pending: 45,
    verified: 234,
    rejected: 67,
    applied: 110,
  },
  recentApplications: [
    {
      userId: { email: "john.doe@example.com" },
      categoryId: { category: "Business License" },
      status: "Pending",
    },
    {
      userId: { email: "jane.smith@example.com" },
      categoryId: { category: "Tax Registration" },
      status: "Verified",
    },
    {
      userId: { email: "mike.johnson@example.com" },
      categoryId: { category: "Health Permit" },
      status: "Under Review",
    },
    {
      userId: { email: "sarah.wilson@example.com" },
      categoryId: { category: "Building Permit" },
      status: "Rejected",
    },
    {
      userId: { email: "david.brown@example.com" },
      categoryId: { category: "Food License" },
      status: "Verified",
    },
    {
      userId: { email: "lisa.davis@example.com" },
      categoryId: { category: "Trade License" },
      status: "Pending",
    },
  ],
}

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setStats(DUMMY_STATS)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)

    /* COMMENTED OUT - BACKEND INTEGRATION
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    */
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">Error loading dashboard data</p>
        </div>
      </div>
    )
  }

  const pieChartData = {
    labels: ["Mobile Users", "Web Users"],
    datasets: [
      {
        data: [stats.mobileUsersPercentage, 100 - stats.mobileUsersPercentage],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "User Platform Distribution",
      },
    },
  }

  const barChartData = {
    labels: ["Pending", "Verified", "Rejected", "Applied"],
    datasets: [
      {
        label: "Applications",
        data: [
          stats.applicationStatusData.pending,
          stats.applicationStatusData.verified,
          stats.applicationStatusData.rejected,
          stats.applicationStatusData.applied,
        ],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Application Status Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "verified":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "under review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="admin-dashboard p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of system statistics and recent activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Users" value={stats.totalUsers} />
        <StatsCard title="Total Mobile Users" value={stats.totalExpoTokens} />
        <StatsCard title="Total Applications" value={stats.totalApplications} />
        <StatsCard title="Pending Applications" value={stats.applicationStatusData.pending} />
        <StatsCard title="Verified Applications" value={stats.applicationStatusData.verified} />
        <StatsCard title="Rejected Applications" value={stats.applicationStatusData.rejected} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                  User Email
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.recentApplications.map((application, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">
                    {application.userId.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">
                    {application?.categoryId?.category}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
