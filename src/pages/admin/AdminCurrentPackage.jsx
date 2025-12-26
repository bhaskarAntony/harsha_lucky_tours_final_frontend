import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/Layout/AdminLayout';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Package, 
  Video, 
  Crown, 
  Calendar, 
  Check, 
  User, 
  Search, 
  Upload, 
  Users,
  DollarSignIcon,
  IndianRupee
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminCurrentPackage = () => {
  const [currentPackage, setCurrentPackage] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const [winnerFormData, setWinnerFormData] = useState({
    winnerId: '',
    feedbackMessage: '',
    feedbackVideo: ''
  });

  useEffect(() => {
    fetchCurrentPackage();
    fetchUsers();
  }, []);

  const fetchCurrentPackage = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/packages/current');
      setCurrentPackage(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch current package');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/admin/users');
      setUsers(response.data.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users');
    }
  };

  const handleUpdateLiveVideo = async (videoUrl) => {
    if (!videoUrl) {
      toast.error('Please enter a YouTube video URL');
      return;
    }

    setFormLoading(true);
    try {
      await axios.put('https://harsha-lucky-tours-final-backend.onrender.com/api/admin/packages/current/update', {
        liveVideoUrl: videoUrl
      });
      toast.success('Live video updated successfully');
      fetchCurrentPackage();
    } catch (error) {
      toast.error('Failed to update live video');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSelectWinner = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      await axios.put('https://harsha-lucky-tours-final-backend.onrender.com/api/packages/current/update', {
        winnerId: winnerFormData.winnerId,
        feedbackMessage: winnerFormData.feedbackMessage,
        feedbackVideo: winnerFormData.feedbackVideo
      });
      toast.success('Winner announced successfully!');
      setShowWinnerModal(false);
      fetchCurrentPackage();
    } catch (error) {
      toast.error('Failed to announce winner');
    } finally {
      setFormLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.name} ${user.virtualCardNumber} ${user.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleWinnerFormChange = (e) => {
    const { name, value } = e.target;
    setWinnerFormData({ ...winnerFormData, [name]: value });
  };

  const handleSearchUsers = (e) => {
    setSearchTerm(e.target.value);
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Current Month Package</h1>
          <p className="text-gray-600">Manage live draw and winner announcement</p>
        </div>

        {!currentPackage ? (
          <div className="card p-8 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Current Package</h3>
            <p className="text-gray-500">Please create a package and set it as current in Packages management.</p>
          </div>
        ) : (
          <>
            {/* Package Details Card */}
            <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentPackage.name}</h2>
                  <p className="text-gray-600">{currentPackage.month} {currentPackage.year}</p>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800`}>
                  {currentPackage.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Draw Date</p>
                  <p className="font-bold">{new Date(currentPackage.drawDate).toLocaleDateString()}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Monthly Installment</p>
                  <p className="font-bold">₹{currentPackage.monthlyInstallment.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="font-bold">{currentPackage.totalParticipants || 0}</p>
                </div>
              </div>
            </div>

            {/* Live Video Section */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Video className="w-5 h-5 mr-2" />
                Live Draw Video
              </h3>
              {currentPackage.liveVideoUrl ? (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentPackage.liveVideoUrl.split('/').pop().split('?')[0]}`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No live video uploaded</p>
                  <input
                    type="url"
                    placeholder="Enter YouTube video URL"
                    className="input-field w-full max-w-md mx-auto"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateLiveVideo(e.target.value);
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* Winner Section */}
            {currentPackage.status === 'current' && !currentPackage.winner && (
              <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                    Announce Winner
                  </h3>
                  <button
                    onClick={() => setShowWinnerModal(true)}
                    className="btn-primary flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Select Winner
                  </button>
                </div>
              </div>
            )}

            {currentPackage.winner && (
              <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-green-600" />
                  Winner Announced
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{currentPackage.winner.name}</h4>
                      <p className="text-gray-600">{currentPackage.winner.virtualCardNumber}</p>
                      <p className="text-sm text-gray-500">{currentPackage.winner.city}</p>
                    </div>
                  </div>
                  {currentPackage.winner.feedbackMessage && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded">
                      <p className="italic text-sm">"{currentPackage.winner.feedbackMessage}"</p>
                    </div>
                  )}
                  {currentPackage.winner.feedbackVideo && (
                    <div className="mt-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${currentPackage.winner.feedbackVideo.split('/').pop().split('?')[0]}`}
                        className="w-full aspect-video rounded"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Winner Selection Modal */}
        <Modal
          isOpen={showWinnerModal}
          onClose={() => setShowWinnerModal(false)}
          title="Announce Lucky Winner"
          size="xl"
        >
          <form onSubmit={handleSelectWinner} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search & Select Winner *
              </label>
              <input
                type="text"
                placeholder="Search users by name, card number, or phone..."
                value={searchTerm}
                onChange={handleSearchUsers}
                className="input-field mb-4"
              />
              <div className="border border-gray-300 rounded-md p-3 max-h-60 overflow-y-auto">
                {filteredUsers.slice(0, 10).map((user) => (
                  <label key={user._id} className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="radio"
                      name="winnerId"
                      value={user._id}
                      checked={winnerFormData.winnerId === user._id}
                      onChange={handleWinnerFormChange}
                      className="mr-3"
                      required
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.virtualCardNumber} • {user.phone} • {user.city}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Winner's Feedback Message (Optional)
              </label>
              <textarea
                name="feedbackMessage"
                value={winnerFormData.feedbackMessage}
                onChange={handleWinnerFormChange}
                className="input-field"
                rows={3}
                placeholder="Winner's experience message..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Video URL (Optional)
              </label>
              <input
                type="url"
                name="feedbackVideo"
                value={winnerFormData.feedbackVideo}
                onChange={handleWinnerFormChange}
                className="input-field"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowWinnerModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading || !winnerFormData.winnerId}
                className="btn-primary flex items-center"
              >
                {formLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Announcing...
                  </>
                ) : (
                  'Announce Winner'
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminCurrentPackage;