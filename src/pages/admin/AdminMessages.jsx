import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/Layout/AdminLayout';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Mail, 
  MessageCircle, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  User, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'both',
    userIds: []
  });

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, [searchTerm]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/messages', {
        params: { search: searchTerm }
      });
      setMessages(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(response.data.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      await axios.post('http://localhost:5000/api/admin/messages', {
        ...formData,
        userIds: selectedUsers
      });
      toast.success('Message sent successfully');
      setShowCreateModal(false);
      resetForm();
      fetchMessages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/messages/${messageId}`);
        toast.success('Message record deleted successfully');
        fetchMessages();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'both',
      userIds: []
    });
    setSelectedUsers([]);
    setSelectedMessage(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return '📧';
      case 'sms': return '📱';
      case 'both': return '📨';
      default: return '💌';
    }
  };

  const getStatusStats = (recipients) => {
    const sent = recipients.filter(r => r.status === 'sent').length;
    const failed = recipients.filter(r => r.status === 'failed').length;
    const total = recipients.length;
    return { sent, failed, total };
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
            <h1 className="text-2xl font-bold text-gray-900">Email & SMS Management</h1>
            <p className="text-gray-600">Send bulk messages and track delivery status</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Send Message
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
              placeholder="Search messages by title or recipient..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-field pl-10 w-full"
            />
          </div>
        </div>

        {/* Messages Table */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Message History ({messages.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success/Failed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent By
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
                {messages.map((msg) => {
                  const stats = getStatusStats(msg.recipients || []);
                  return (
                    <tr key={msg._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{msg.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{msg.message}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center text-sm text-gray-900">
                          {getTypeIcon(msg.type)}
                          <span className="ml-2 capitalize">{msg.type}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stats.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {stats.sent}
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                            {stats.failed}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">{msg.sentBy?.name}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Send Message Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            resetForm();
          }}
          title="Send New Message"
          size="xl"
        >
          <form onSubmit={handleCreateMessage} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                className="input-field"
                required
                placeholder="Message title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Content *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="input-field"
                rows={6}
                required
                placeholder="Enter your message..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                >
                  <option value="email">Email Only</option>
                  <option value="sms">SMS Only</option>
                  <option value="both">Email + SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Recipients ({selectedUsers.length})
                </label>
                <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                  {users.slice(0, 20).map((user) => (
                    <label key={user._id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleUserSelection(user._id)}
                        className="mr-2"
                      />
                      <span className="text-sm">{user.name} - {user.phone}</span>
                    </label>
                  ))}
                  {users.length > 20 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Showing first 20 users. {users.length - 20} more available.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading || selectedUsers.length === 0}
                className="btn-primary flex items-center"
              >
                {formLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Sending...
                  </>
                ) : (
                  `Send to ${selectedUsers.length} Recipients`
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;