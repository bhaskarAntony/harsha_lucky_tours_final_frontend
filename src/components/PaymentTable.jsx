import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function PaymentTable({ payments, onUpdateStatus }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'paid':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
        };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: <AlertCircle className="w-4 h-4 text-yellow-600" />,
        };
      case 'overdue':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: <AlertCircle className="w-4 h-4 text-red-600" />,
        };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: null };
    }
  };

  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No payments found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden min-w-full divide-y divide-gray-200 md:table">
        <thead className="bg-gray-50">
          <tr>
            {['User', 'Email', 'Phone', 'Amount', 'Due Date', 'Status', 'Description', 'Actions'].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((p) => {
            const s = getStatusStyle(p.status);
            return (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {p.userId?.name || '—'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.email || '—'}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.phone || '—'}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  ${p.amount?.toLocaleString() || 0}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {p.dueDate ? new Date(p.dueDate).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {s.icon}
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${s.bg} ${s.text}`}>
                      {p.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                  {p.description || '—'}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={p.status}
                    onChange={(e) => onUpdateStatus(p._id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-2">
        {payments.map((p) => {
          const s = getStatusStyle(p.status);
          return (
            <div key={p._id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-900">{p.userId?.name || '—'}</div>
                <div className="flex items-center gap-1">
                  {s.icon}
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${s.bg} ${s.text}`}>
                    {p.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Email:</strong> {p.email || '—'}</div>
                <div><strong>Phone:</strong> {p.phone || '—'}</div>
                <div><strong>Amount:</strong> &#8377;{p.amount?.toLocaleString() || 0}</div>
                <div><strong>Due:</strong> {p.dueDate ? new Date(p.dueDate).toLocaleDateString() : '—'}</div>
                {p.description && <div><strong>Desc:</strong> {p.description}</div>}
              </div>
              <div className="mt-3">
                <select
                  value={p.status}
                  onChange={(e) => onUpdateStatus(p._id, e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}