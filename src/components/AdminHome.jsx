import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';

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
  LinearScale
);
import StatsCard from "./StatsCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  const pieChartData = {
    labels: ['Mobile Users', 'Web Users'],
    datasets: [{
      data: [stats.mobileUsersPercentage, 100 - stats.mobileUsersPercentage],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }]
  };

  const barChartData = {
    labels: ['Pending', 'Verified', 'Rejected', 'Applied'],
    datasets: [{
      label: 'Applications',
      data: [
        stats.applicationStatusData.pending,
        stats.applicationStatusData.verified,
        stats.applicationStatusData.rejected,
        stats.applicationStatusData.applied,
      ],
      backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4BC0C0'],
    }]
  };

  return (
    <div className="admin-dashboard p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Users" value={stats.totalUsers} />
        <StatsCard title="Total Mobile Users" value={stats.totalExpoTokens} />
        <StatsCard title="Total Applications" value={stats.totalApplications} />
        <StatsCard title="Pending Applications" value={stats.applicationStatusData.pending} />
        <StatsCard title="Verified Applications" value={stats.applicationStatusData.verified} />
        <StatsCard title="Rejected Applications" value={stats.applicationStatusData.rejected} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded p-4">
          <Pie data={pieChartData} />
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <Bar data={barChartData} />
        </div>
      </div>
      <div className="mt-8 bg-white shadow-md rounded p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold">User</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold">Category</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentApplications.map((application, index) => (
              <tr key={index}>
                {/* <td className="py-2 px-4 border-b border-gray-200">{application.userId.email}</td> */}
                <td className="py-2 px-4 border-b border-gray-200">{application.categoryId.category}</td>
                <td className="py-2 px-4 border-b border-gray-200">{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
