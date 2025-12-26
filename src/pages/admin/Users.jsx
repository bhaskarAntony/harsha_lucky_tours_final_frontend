'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/Layout/AdminLayout';
import ImportExport from '../../components/ImportExport';
import { Loader2, Search, Download, Edit2, Trash2, Eye, User, Upload, Mail, Phone, MapPin, CheckCircle, XCircle, Plus } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showImport, setShowImport] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    dateOfBirth: '',
    isActive: true,
  });
  const [formLoading, setFormLoading] = useState(false);

  // --------------------------------------------------- FETCH
  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/users', {
        params: { page: currentPage, limit: 10, search: searchTerm },
      });
      setUsers(data.data?.users ?? []);
      setTotalPages(data.data?.totalPages ?? 1);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------- SEARCH
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // --------------------------------------------------- CREATE USER
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await axios.post('http://localhost:5000/api/fromadmin', createForm);
      toast.success('User created');
      setShowCreate(false);
      setCreateForm({
        name: '', email: '', phone: '', city: '', address: '', dateOfBirth: '', isActive: true,
      });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Create failed');
    } finally {
      setFormLoading(false);
    }
  };

  // --------------------------------------------------- INLINE EDIT
  const startEdit = (user) => {
    setEditingId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      address: user.address ?? '',
      isActive: user.isActive,
    });
  };

  const saveEdit = async () => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/fromadmin/${editingId}`, editForm);
      setUsers((prev) => prev.map((u) => (u._id === editingId ? data : u)));
      setEditingId(null);
      toast.success('User updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // --------------------------------------------------- DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch {
      toast.error('Delete failed');
    }
  };

  // --------------------------------------------------- EXPORT
  const handleExport = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/fromadmin/export', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.xlsx';
      a.click();
      toast.success('Exported');
    } catch {
      toast.error('Export failed');
    }
  };

  // --------------------------------------------------- IMPORT SUCCESS
  const onImportSuccess = () => {
    setShowImport(false);
    fetchUsers();
  };

  // --------------------------------------------------- RENDER
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
      <div className="p-0 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600">Create, import, edit, and manage users</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Create User
            </button>
            <button
              onClick={() => setShowImport(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Import Modal */}
        {showImport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <ImportExport
                type="users"
                onSuccess={onImportSuccess}
                onCancel={() => setShowImport(false)}
              />
            </div>
          </div>
        )}

        {/* Create User Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-semibold mb-4">Create New User</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Full Name *" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} className="border rounded px-3 py-2" required />
                  <input placeholder="Email *" type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} className="border rounded px-3 py-2" required />
                  <input placeholder="Phone *" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} className="border rounded px-3 py-2" required />
                  <input placeholder="City *" value={createForm.city} onChange={(e) => setCreateForm({ ...createForm, city: e.target.value })} className="border rounded px-3 py-2" required />
                  <input placeholder="Address" value={createForm.address} onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })} className="border rounded px-3 py-2 md:col-span-2" />
                  <input type="date" placeholder="Date of Birth" value={createForm.dateOfBirth} onChange={(e) => setCreateForm({ ...createForm, dateOfBirth: e.target.value })} className="border rounded px-3 py-2" />
                  <label className="flex items-center gap-2 md:col-span-2">
                    <input type="checkbox" checked={createForm.isActive} onChange={(e) => setCreateForm({ ...createForm, isActive: e.target.checked })} />
                    Active User
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    Cancel
                  </button>
                  <button type="submit" disabled={formLoading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2">
                    {formLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create User'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">All Users ({users.length})</h2>
          </div>

          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {editingId === user._id ? (
                        <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="border rounded px-2 py-1 w-full" />
                      ) : (
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.virtualCardNumber ?? '—'}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === user._id ? (
                        <div className="space-y-1">
                          <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="border rounded px-2 py-1 w-full text-sm" />
                          <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="border rounded px-2 py-1 w-full text-sm" />
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</div>
                          <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === user._id ? (
                        <input value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} className="border rounded px-2 py-1 w-full" />
                      ) : (
                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {user.city}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="font-medium">
                        ₹{(user.totalAmountPaid ?? 0).toLocaleString()}
                      </p>
                      <p className="text-gray-500">{user.monthsPaid ?? 0} months</p>
                    </td>
                    <td className="px-6 py-4">
                      {editingId === user._id ? (
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={editForm.isActive} onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })} />
                          Active
                        </label>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === user._id ? (
                        <div className="flex gap-1">
                          <button onClick={saveEdit} className="text-green-600 hover:text-green-800">Save</button>
                          <button onClick={cancelEdit} className="text-red-600 hover:text-red-800">Cancel</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(user)} className="text-indigo-600 hover:text-indigo-800"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {users.map((user) => (
              <div key={user._id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.virtualCardNumber ?? '—'}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</div>
                  <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</div>
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {user.city}</div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">₹{(user.totalAmountPaid ?? 0).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{user.monthsPaid ?? 0} months</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(user)} className="text-indigo-600"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(user._id)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                {editingId === user._id && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" className="w-full border rounded px-2 py-1 text-sm" />
                    <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" className="w-full border rounded px-2 py-1 text-sm" />
                    <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Phone" className="w-full border rounded px-2 py-1 text-sm" />
                    <input value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} placeholder="City" className="w-full border rounded px-2 py-1 text-sm" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={editForm.isActive} onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })} />
                      Active
                    </label>
                    <div className="flex gap-2">
                      < button onClick={saveEdit} className="flex-1 bg-green-600 text-white py-1 rounded text-sm">Save</button>
                      < button onClick={cancelEdit} className="flex-1 bg-gray-300 text-gray-800 py-1 rounded text-sm">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex justify-between items-center text-sm">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}