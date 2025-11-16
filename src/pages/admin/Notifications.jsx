import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/Layout/AdminLayout';

const Notifications = () => {
  const [users, setUsers] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]); // Always array
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [notificationType, setNotificationType] = useState('sms');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('single');

  // Single notification states
  const [singlePhone, setSinglePhone] = useState('');
  const [singleEmail, setSingleEmail] = useState('');
  const [singleSubject, setSingleSubject] = useState('');
  const [singleMessage, setSingleMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [inputMethod, setInputMethod] = useState('manual');

  useEffect(() => {
    fetchUsers();
    fetchPendingPayments();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/admin/users');
      // Ensure it's an array
      setUsers(Array.isArray(response.data.data.users) ? response.data.data.users : []);
    } catch (error) {
      toast.error('Error fetching users');
      setUsers([]);
    }
  };

  const fetchPendingPayments = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/pending');
      // CRITICAL FIX: Extract array safely
      let payments = [];

      if (response.data) {
        if (Array.isArray(response.data)) {
          payments = response.data;
        } else if (response.data.pending && Array.isArray(response.data.pending)) {
          payments = response.data.pending;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          payments = response.data.data;
        }
      }

      setPendingPayments(payments);
    } catch (error) {
      toast.error('Error fetching pending payments');
      setPendingPayments([]);
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };

  const handleSendSingleNotification = async () => {
    if (!singleMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (notificationType === 'email' && !singleSubject.trim()) {
      toast.error('Please enter a subject for email');
      return;
    }

    if (inputMethod === 'manual') {
      if (notificationType === 'sms' && !singlePhone.trim()) {
        toast.error('Please enter a phone number');
        return;
      }
      if (notificationType === 'email' && !singleEmail.trim()) {
        toast.error('Please enter an email address');
        return;
      }
    } else {
      if (!selectedUser) {
        toast.error('Please select a user');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint =
        notificationType === 'sms'
          ? 'https://harsha-lucky-tours-final-backend.onrender.com/api/sms/single'
          : 'https://harsha-lucky-tours-final-backend.onrender.com/api/email/single';

      let payload = { message: singleMessage };

      if (inputMethod === 'manual') {
        if (notificationType === 'sms') {
          payload.phone = singlePhone;
        } else {
          payload.email = singleEmail;
          payload.subject = singleSubject;
        }
      } else {
        payload.userId = selectedUser;
        if (notificationType === 'email') {
          payload.subject = singleSubject;
        }
      }

      const response = await axios.post(endpoint, payload);
      toast.success(response.data.message);

      // Reset form
      setSingleMessage('');
      setSingleSubject('');
      setSinglePhone('');
      setSingleEmail('');
      setSelectedUser('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending notification');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user');
      return;
    }

    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (notificationType === 'email' && !subject.trim()) {
      toast.error('Please enter a subject for email');
      return;
    }

    setLoading(true);

    try {
      const selectedUserData = users.filter((user) => selectedUsers.includes(user._id));
      const recipients = notificationType === 'sms'
        ? selectedUserData.map((user) => user.phone).filter(Boolean)
        : selectedUserData.map((user) => user.email).filter(Boolean);

      if (recipients.length === 0) {
        toast.error(`No valid ${notificationType} addresses found`);
        setLoading(false);
        return;
      }

      const endpoint =
        notificationType === 'sms'
          ? 'https://harsha-lucky-tours-final-backend.onrender.com/api/sms/bulk'
          : 'https://harsha-lucky-tours-final-backend.onrender.com/api/email/bulk';

      const payload = notificationType === 'sms'
        ? { message, recipients }
        : { subject, message, recipients };

      const response = await axios.post(endpoint, payload);
      toast.success(response.data.message);

      setMessage('');
      setSubject('');
      setSelectedUsers([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending notification');
    } finally {
      setLoading(false);
    }
  };

  const handleSendPaymentReminders = async () => {
    if (!Array.isArray(pendingPayments) || pendingPayments.length === 0) {
      toast.error('No pending payments found');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://harsha-lucky-tours-final-backend.onrender.com/api/payment-reminders', {
        type: notificationType,
        customMessage: message.trim() || undefined,
      });
      toast.success(response.data.message);
      setMessage('');
      await fetchPendingPayments(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending reminders');
    } finally {
      setLoading(false);
    }
  };

  // Safe access to pending payments
  const safePendingPayments = Array.isArray(pendingPayments) ? pendingPayments : [];

  return (
    <AdminLayout>
        <div className="min-h-screen bg-gray-50 py-8 px-0 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-8">Notifications</h1>

        {/* Tab Navigation */}
        <div className="mb-8 bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['single', 'bulk'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-semibold text-sm capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'single' ? 'Single Notification' : 'Bulk Notification'}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'single' ? (
          /* Single Notification Tab */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Send Single Notification */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Single Notification</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type
                  </label>
                  <select
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  >
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Method
                  </label>
                  <select
                    value={inputMethod}
                    onChange={(e) => setInputMethod(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="manual">Enter Manually</option>
                    <option value="select">Select from Database</option>
                  </select>
                </div>

                {inputMethod === 'manual' ? (
                  <>
                    {notificationType === 'sms' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={singlePhone}
                          onChange={(e) => setSinglePhone(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="+1234567890"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={singleEmail}
                          onChange={(e) => setSingleEmail(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="user@example.com"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select User
                    </label>
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Choose a user...</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name} ({notificationType === 'sms' ? user.phone : user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {notificationType === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={singleSubject}
                      onChange={(e) => setSingleSubject(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter email subject"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={singleMessage}
                    onChange={(e) => setSingleMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                <button
                  onClick={handleSendSingleNotification}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Sending...' : `Send ${notificationType.toUpperCase()}`}
                </button>
              </div>
            </div>

            {/* Payment Reminders */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Reminders</h2>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-600">
                    Pending Payments: <span className="font-bold text-indigo-600">{safePendingPayments.length}</span>
                  </p>

                  {safePendingPayments.length > 0 && (
                    <div className="mt-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                      {safePendingPayments.slice(0, 5).map((payment) => (
                        <div key={payment._id} className="text-sm py-1.5 text-gray-700">
                          {payment.userId?.name || 'Unknown'} - <span className="font-medium">${payment.amount}</span>
                        </div>
                      ))}
                      {safePendingPayments.length > 5 && (
                        <p className="text-xs text-gray-500 mt-2">
                          ...and {safePendingPayments.length - 5} more
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-28 resize-none"
                    placeholder="Leave empty to use default reminder"
                  />
                </div>

                <button
                  onClick={handleSendPaymentReminders}
                  disabled={loading || safePendingPayments.length === 0}
                  className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Sending...' : `Send Reminders via ${notificationType.toUpperCase()}`}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Bulk Notification Tab */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bulk Custom Notification */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Bulk Notification</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type
                  </label>
                  <select
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                {notificationType === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter email subject"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-gray-700">Select Recipients</label>
                    <button
                      onClick={handleSelectAll}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      {selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>

                  <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
                    {users.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No users found</p>
                    ) : (
                      users.map((user) => (
                        <label
                          key={user._id}
                          className="flex items-center mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user._id)}
                            onChange={() => handleUserSelection(user._id)}
                            className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            {user.name} ({notificationType === 'sms' ? user.phone : user.email})
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSendNotification}
                  disabled={loading || selectedUsers.length === 0}
                  className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Sending...' : `Send ${notificationType.toUpperCase()}`}
                </button>
              </div>
            </div>

            {/* Payment Reminders (Bulk Tab) */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Reminders</h2>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-600">
                    Pending Payments: <span className="font-bold text-indigo-600">{safePendingPayments.length}</span>
                  </p>

                  {safePendingPayments.length > 0 && (
                    <div className="mt-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                      {safePendingPayments.slice(0, 5).map((payment) => (
                        <div key={payment._id} className="text-sm py-1.5 text-gray-700">
                          {payment.userId?.name || 'Unknown'} - <span className="font-medium">${payment.amount}</span>
                        </div>
                      ))}
                      {safePendingPayments.length > 5 && (
                        <p className="text-xs text-gray-500 mt-2">
                          ...and {safePendingPayments.length - 5} more
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-28 resize-none"
                    placeholder="Leave empty to use default reminder"
                  />
                </div>

                <button
                  onClick={handleSendPaymentReminders}
                  disabled={loading || safePendingPayments.length === 0}
                  className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Sending...' : `Send Reminders via ${notificationType.toUpperCase()}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>

  );
};

export default Notifications;