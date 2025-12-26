import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PaymentTable from '../../components/PaymentTable';
import ImportExport from '../../components/ImportExport';
import AdminLayout from '../../components/Layout/AdminLayout';
import { Loader2 } from 'lucide-react';

export default function PendingPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImport, setShowImport] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/pending');
      const list = Array.isArray(data) ? data : [];
      setPayments(list);
    } catch (err) {
      toast.error('Failed to load payments');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/pending/${id}`, { status });
      setPayments(prev => prev.map(p => p._id === id ? data : p));
      toast.success('Status updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const onImportSuccess = () => {
    fetchPayments();
    setShowImport(false);
  };

  const filtered = payments.filter(p => filter === 'all' || p.status === filter);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Payments Management
          </h1>
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Import Payments
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Import Modal */}
        {showImport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <ImportExport
                type="payments"
                onSuccess={onImportSuccess}
                onCancel={() => setShowImport(false)}
              />
            </div>
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              {filter === 'all' ? 'All Payments' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Payments`} ({filtered.length})
            </h2>
          </div>
          <PaymentTable payments={filtered} onUpdateStatus={updateStatus} />
        </div>
      </div>
    </AdminLayout>
  );
}