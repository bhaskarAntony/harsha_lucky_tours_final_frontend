import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import AdminLayout from '../../components/Layout/AdminLayout';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  User, 
  Calendar, 
  Phone, 
  Mail 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: '',
    packageId: '',
    amount: '',
    paymentMode: 'UPI',
    month: '',
    year: new Date().getFullYear(),
    notes: ''
  });

  useEffect(() => {
    fetchPayments();
    fetchDropdownData();
  }, [currentPage, searchTerm]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/payments', {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm
        }
      });
      setPayments(response.data.data.payments || []);
    } catch (error) {
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [usersRes, packagesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/users'),
        axios.get('http://localhost:5000/api/packages')
      ]);
      setUsers(usersRes.data.data.users || []);
      setPackages(packagesRes.data.data || []);
    } catch (error) {
      console.error('Failed to fetch dropdown data');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      await axios.post('http://localhost:5000/api/admin/payments', formData);
      toast.success('Payment created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchPayments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create payment');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditPayment = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/admin/payments/${formData._id}`, formData);
      toast.success('Payment updated successfully');
      setShowEditModal(false);
      resetForm();
      fetchPayments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update payment');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/payments/${paymentId}`);
        toast.success('Payment deleted successfully');
        fetchPayments();
      } catch (error) {
        toast.error('Failed to delete payment');
      }
    }
  };

  const openEditModal = (payment) => {
    setFormData({
      _id: payment._id,
      userId: payment.userId?._id,
      packageId: payment.packageId?._id,
      amount: payment.amount,
      paymentMode: payment.paymentMode,
      month: payment.month,
      year: payment.year,
      notes: payment.notes || ''
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      userId: '',
      packageId: '',
      amount: '',
      paymentMode: 'UPI',
      month: '',
      year: new Date().getFullYear(),
      notes: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case 'UPI': return '💳';
      case 'Cash': return '💵';
      case 'Card': return '💳';
      case 'Bank Transfer': return '🏦';
      default: return '💰';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
            <p className="text-gray-600">Manage user payments and transactions</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Payment
          </button>
        </div>

        {/* Search */}
        <div className="card p-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search payments by user, package, or transaction ID..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-field pl-10 w-full"
            />
          </div>
        </div>

        {/* Payments Table */}
        <div className="card">
  <div className="px-6 py-4 border-b border-gray-200">
    <h2 className="text-lg font-medium text-gray-900 flex items-center">
      <CreditCard className="w-5 h-5 mr-2" />
      All Payments ({payments.length})
    </h2>
  </div>

  {/* Desktop Table */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Package
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Month/Year
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Payment Mode
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Transaction ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {payments.map((payment) => (
          <tr key={payment._id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {payment.userId?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {payment.userId?.virtualCardNumber || '—'}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <p className="text-sm font-medium text-gray-900">
                {payment.packageId?.name || '—'}
              </p>
              <p className="text-sm text-gray-500">
                {payment.packageId?.month || '—'}
              </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <p className="text-sm font-medium text-green-600">
                ₹{payment.amount.toLocaleString()}
              </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {payment.month} {payment.year}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="flex items-center text-sm text-gray-900">
                {getPaymentModeIcon(payment.paymentMode)}
                <span className="ml-2">{payment.paymentMode}</span>
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                {payment.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <p className="text-sm font-mono text-gray-900">
                {payment.transactionId?.substring(0, 12)}...
              </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {format(new Date(payment.paymentDate || payment.createdAt), 'MMM dd, yyyy')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEditModal(payment)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePayment(payment._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="md:hidden space-y-4 p-4">
    {payments.map((payment) => (
      <div
        key={payment._id}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Header: User + Amount */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {payment.userId?.name || 'Unknown User'}
              </p>
              <p className="text-xs text-gray-500">
                {payment.userId?.virtualCardNumber || '—'}
              </p>
            </div>
          </div>
          <p className="text-lg font-bold text-green-600">
            ₹{payment.amount.toLocaleString()}</p>
        </div>

        {/* Package */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Package</p>
          <p className="font-medium">
            {payment.packageId?.name || '—'}
            {payment.packageId?.month && ` (${payment.packageId.month})`}
          </p>
        </div>

        {/* Grid: 2 columns */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Month/Year</p>
            <p className="font-medium">{payment.month} {payment.year}</p>
          </div>
          <div>
            <p className="text-gray-500">Payment Mode</p>
            <p className="font-medium flex items-center">
              {getPaymentModeIcon(payment.paymentMode)}
              <span className="ml-1">{payment.paymentMode}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
              {payment.status}
            </span>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">
              {format(new Date(payment.paymentDate || payment.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Transaction ID</p>
            <p className="font-mono text-xs text-gray-700">
              {payment.transactionId?.substring(0, 16)}...
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
          <button className="text-blue-600 hover:text-blue-800">
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => openEditModal(payment)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeletePayment(payment._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
        {/* Create/Edit Payment Modal */}
        <Modal
          isOpen={showCreateModal || showEditModal}
          onClose={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
          title={showCreateModal ? "Create New Payment" : "Edit Payment"}
          size="lg"
        >
          <form onSubmit={showCreateModal ? handleCreatePayment : handleEditPayment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select User *</label>
                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                >
                  <option value="">Choose User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} - {user.virtualCardNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Package *</label>
                <select
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                >
                  <option value="">Choose Package</option>
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.name} - {pkg.month} {pkg.year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Month *</label>
                <input
                  type="month"
                  name="month"
                  value={formData.month}
                  onChange={handleFormChange}
                  className="input-field"
                  placeholder="January"
                  required
                />

                {/* <select name="" id="" className="input-field">
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode *</label>
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                >
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                className="input-field"
                rows={3}
                placeholder="Additional notes about this payment..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="btn-primary flex items-center"
              >
                {formLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    {showCreateModal ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  showCreateModal ? 'Create Payment' : 'Update Payment'
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;