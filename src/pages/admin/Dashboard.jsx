import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import AdminLayout from '../../components/Layout/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Users, 
  Package, 
  CreditCard, 
  TrendingUp,
  Calendar,
  Trophy,
  Eye,
  Crown
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard');
      setDashboardData(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  const { stats, recentPayments, recentPackages, recentWinners } = dashboardData;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to Lucky Tours Admin Panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPackages}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalAmountCollected.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Package</p>
                <p className="text-lg font-bold text-gray-900">
                  {stats.currentPackage ? 'Active' : 'None'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Package Details */}
        {stats.currentPackage && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Month Package</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{stats.currentPackage.name}</h3>
                  <p className="text-gray-600">{stats.currentPackage.month} {stats.currentPackage.year}</p>
                </div>
                <div className="text-right">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Participants</p>
                      <p className="text-xl font-bold text-blue-600">{stats.currentPackage.totalParticipants}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="text-xl font-bold text-green-600">₹{stats.currentPackage.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Payments */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Payments</h2>
            <div className="space-y-4">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment) => (
                  <div key={payment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{payment.userId?.name}</p>
                        <p className="text-sm text-gray-600">{payment.userId?.virtualCardNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{format(new Date(payment.createdAt), 'MMM dd')}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent payments</p>
              )}
            </div>
          </div>

          {/* Recent Winners */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Winners</h2>
            <div className="space-y-4">
              {recentWinners.length > 0 ? (
                recentWinners.map((pkg) => (
                  <div key={pkg._id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <Crown className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pkg.winner.name}</p>
                        <p className="text-sm text-gray-600">{pkg.winner.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{pkg.name}</p>
                      <p className="text-sm text-gray-600">{pkg.month} {pkg.year}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent winners</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Packages */}
      <div className="card p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Completed Packages</h2>

  {/* Desktop Table */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Package
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Month/Year
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Participants
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Revenue
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {recentPackages.length > 0 ? (
          recentPackages.map((pkg) => (
            <tr key={pkg._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                  <p className="text-sm text-gray-500">{pkg.packageId}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pkg.month} {pkg.year}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pkg.totalParticipants || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                ₹{(pkg.totalRevenue || 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  Completed
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
              No completed packages yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="md:hidden space-y-4">
    {recentPackages.length > 0 ? (
      recentPackages.map((pkg) => (
        <div
          key={pkg._id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold text-gray-900">{pkg.name}</p>
              <p className="text-xs text-gray-500">{pkg.packageId}</p>
            </div>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
              Completed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Month/Year</p>
              <p className="font-medium">{pkg.month} {pkg.year}</p>
            </div>
            <div>
              <p className="text-gray-500">Participants</p>
              <p className="font-medium">{pkg.totalParticipants || 0}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Revenue</p>
              <p className="font-medium text-green-600">
                ₹{(pkg.totalRevenue || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-8 text-gray-500">
        No completed packages yet
      </div>
    )}
  </div>
</div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;