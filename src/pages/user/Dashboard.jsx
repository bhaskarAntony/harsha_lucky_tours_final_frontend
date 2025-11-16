import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import UserLayout from '../../components/Layout/UserLayout';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Calendar, 
  CreditCard, 
  Trophy, 
  Eye, 
  MapPin, 
  Clock,
  Users,
  Gift
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/user/dashboard');
      setDashboardData(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewPayment = async (paymentId) => {
    try {
      const response = await axios.get(`https://harsha-lucky-tours-final-backend.onrender.com/api/user/payments/${paymentId}`);
      setSelectedPayment(response.data.data);
      setShowPaymentModal(true);
    } catch (error) {
      toast.error('Failed to fetch payment details');
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </UserLayout>
    );
  }

  const { monthsPaid, totalAmountPaid, currentPackage, nextDrawDate, payments } = dashboardData;

  return (
    <UserLayout>
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h1>
          <p className="text-blue-100">Track your payments and lucky draw participation</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Months Paid</p>
                <p className="text-2xl font-bold text-gray-900">{monthsPaid}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalAmountPaid.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Next Draw</p>
                <p className="text-lg font-bold text-gray-900">
                  {format(new Date(nextDrawDate), 'MMM dd')}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Gift className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-lg font-bold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Month Package */}
        {currentPackage && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Month Package</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{currentPackage.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {currentPackage.destination.join(', ')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {currentPackage.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {currentPackage.couples} Couples
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{currentPackage.description}</p>
                </div>
                <div className="ml-6 text-right">
                  <p className="text-sm text-gray-600">Monthly Installment</p>
                  <p className="text-2xl font-bold text-green-600">₹{currentPackage.monthlyInstallment}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mt-2">
                    {currentPackage.month} {currentPackage.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment History */}
      <div className="card p-4 sm:p-6">
  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Payment History</h2>

  {payments.length > 0 ? (
    <>
      {/* Desktop Table - Hidden on Mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SI.No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {payment.month} {payment.year}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(payment.paymentDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600">
                  ₹{payment.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  ₹{totalAmountPaid.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => handleViewPayment(payment._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Hidden on Desktop */}
      <div className="md:hidden space-y-3">
        {payments.map((payment, index) => (
          <div
            key={payment._id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium">#{index + 1}</span>
                  <span>•</span>
                  <span>{payment.month} {payment.year}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {format(new Date(payment.paymentDate), 'MMM dd, yyyy')}
                </div>
              </div>
              <button
                onClick={() => handleViewPayment(payment._id)}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                View
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500">Paid Amount</p>
                <p className="text-sm font-semibold text-green-600">
                  ₹{payment.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="text-sm font-medium text-gray-900">
                  ₹{totalAmountPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="text-center py-10">
      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <p className="text-gray-500 text-sm">No payments found</p>
    </div>
  )}
</div>

        {/* Payment Details Modal */}
        <Modal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          title="Payment Details"
          size="lg"
        >
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.transactionId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(new Date(selectedPayment.paymentDate), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <p className="mt-1 text-lg font-bold text-green-600">₹{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.paymentMode}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Month</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.month} {selectedPayment.year}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {selectedPayment.status}
                  </span>
                </div>
              </div>
              
              {selectedPayment.packageId && (
                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Package Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900">{selectedPayment.packageId.name}</h5>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><strong>Destination:</strong> {selectedPayment.packageId.destination?.join(', ')}</p>
                      <p><strong>Duration:</strong> {selectedPayment.packageId.duration}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedPayment.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.notes}</p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </UserLayout>
  );
};

export default Dashboard;