import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/Layout/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from '../../components/Modal';
import { 
  Package, 
  Video, 
  Crown, 
  Calendar, 
  Users, 
  DollarSign, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Edit2, 
  Save, 
  Upload, 
  Search, 
  User, 
  Star, 
  Award 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [videoType, setVideoType] = useState('live'); // 'live' or 'feedback'

  const [winnerFormData, setWinnerFormData] = useState({
    winnerId: '',
    feedbackMessage: '',
    feedbackVideo: ''
  });

  const [videoFormData, setVideoFormData] = useState({
    videoUrl: ''
  });

  useEffect(() => {
    if (id) {
      fetchPackageDetails();
      fetchUsers();
    }
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${id}`);
      const pkg = response.data.data;
      setPackageData(pkg);
      setFormData({
        name: pkg.name,
        destination: pkg.destination || [''],
        couples: pkg.couples,
        duration: pkg.duration,
        images: pkg.images || [],
        description: pkg.description,
        inclusions: pkg.inclusions || [],
        drawDate: pkg.drawDate ? new Date(pkg.drawDate).toISOString().split('T')[0] : '',
        month: pkg.month,
        year: pkg.year,
        monthlyInstallment: pkg.monthlyInstallment,
        packageId: pkg.packageId,
        status: pkg.status
      });
    } catch (error) {
      toast.error('Failed to fetch package details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/users');
      setUsers(response.data.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await axios.put(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${id}`, formData);
      setPackageData(response.data.data);
      setEditing(false);
      toast.success('Package updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update package');
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleMarkAsCurrent = async () => {
    if (window.confirm('Mark this package as current? This will deactivate other current packages.')) {
      try {
        // First update status to current
        const updateResponse = await axios.put(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${id}`, {
          status: 'current'
        });
        
        // Backend logic should handle deactivating other current packages
        setPackageData(updateResponse.data.data);
        toast.success('Package marked as current');
        fetchPackageDetails();
      } catch (error) {
        toast.error('Failed to mark as current');
        console.error(error);
      }
    }
  };

  const handleCompleteDraw = async () => {
    if (!packageData.winner && packageData.status === 'current') {
      toast.error('Please select a winner first');
      setShowWinnerModal(true);
      return;
    }

    if (window.confirm('Mark this package as draw completed?')) {
      try {
        const updateData = { status: 'draw_completed' };
        
        // If no winner selected yet, just update status
        if (!packageData.winner && winnerFormData.winnerId) {
          const winner = await axios.get(`https://harsha-lucky-tours-final-backend.onrender.com/api/users/${winnerFormData.winnerId}`);
          updateData.winner = {
            name: winner.data.name,
            virtualCardNumber: winner.data.virtualCardNumber,
            city: winner.data.city,
            phone: winner.data.phone,
            feedbackMessage: winnerFormData.feedbackMessage || '',
            feedbackVideo: winnerFormData.feedbackVideo || '',
            userId: winnerFormData.winnerId
          };
        }

        const response = await axios.put(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${id}`, updateData);
        setPackageData(response.data.data);
        toast.success('Package marked as completed');
        fetchPackageDetails();
      } catch (error) {
        toast.error('Failed to complete draw');
        console.error(error);
      }
    }
  };

  const handleUpdateVideo = async () => {
    if (!videoFormData.videoUrl) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }

    setFormLoading(true);
    try {
      let updateData = {};
      
      if (videoType === 'live') {
        updateData = { liveVideoUrl: videoFormData.videoUrl };
      } else if (videoType === 'feedback' && packageData.winner) {
        updateData = { 
          'winner.feedbackVideo': videoFormData.videoUrl 
        };
      }

      const response = await axios.put(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${id}`, updateData);
      setPackageData(response.data.data);
      toast.success(`${videoType === 'live' ? 'Live' : 'Feedback'} video updated successfully`);
      setShowVideoModal(false);
      setVideoFormData({ videoUrl: '' });
    } catch (error) {
      toast.error('Failed to update video');
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSelectWinner = async (e) => {
    e.preventDefault();
    if (!winnerFormData.winnerId) {
      toast.error('Please select a winner');
      return;
    }

    setFormLoading(true);
    try {
      // Get winner details
      const winnerResponse = await axios.get(`https://harsha-lucky-tours-final-backend.onrender.com/api/users/${winnerFormData.winnerId}`);
      const winner = winnerResponse.data;

      const updateData = {
        winner: {
          name: winner.name,
          virtualCardNumber: winner.virtualCardNumber,
          city: winner.city,
          phone: winner.phone,
          feedbackMessage: winnerFormData.feedbackMessage,
          feedbackVideo: winnerFormData.feedbackVideo || '',
          userId: winnerFormData.winnerId
        },
        status: 'draw_completed' // Auto-complete when winner is selected
      };

      const response = await axios.put(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${id}`, updateData);
      setPackageData(response.data.data);
      toast.success('Winner selected and draw completed successfully!');
      setShowWinnerModal(false);
      setWinnerFormData({
        winnerId: '',
        feedbackMessage: '',
        feedbackVideo: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to select winner');
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.name} ${user.virtualCardNumber} ${user.phone} ${user.city}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayFieldChange = (fieldName, index, value) => {
    const updated = [...(formData[fieldName] || [''])];
    updated[index] = value;
    setFormData({ ...formData, [fieldName]: updated });
  };

  const addArrayField = (fieldName) => {
    const current = formData[fieldName] || [''];
    setFormData({ ...formData, [fieldName]: [...current, ''] });
  };

  const removeArrayField = (fieldName, index) => {
    const updated = (formData[fieldName] || ['']).filter((_, i) => i !== index);
    setFormData({ ...formData, [fieldName]: updated.length ? updated : [''] });
  };

  const getStatusBadge = (status) => {
    const colors = {
      upcoming: 'bg-gray-100 text-gray-800',
      current: 'bg-blue-100 text-blue-800',
      draw_completed: 'bg-green-100 text-green-800'
    };
    const statusText = status.replace('_', ' ').toUpperCase();
    return (
      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusText}
      </span>
    );
  };

  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url?.match(regex);
    return match ? match[1] : null;
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

  if (!packageData) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Package not found</h3>
          <button onClick={() => navigate('/admin/packages')} className="btn-primary mt-4">
            Back to Packages
          </button>
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
            <h1 className="text-2xl font-bold text-gray-900">{packageData.name}</h1>
            <p className="text-gray-600">
              {packageData.packageId} • {getStatusBadge(packageData.status)}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {!editing && (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="btn-secondary flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Details
                </button>
                {packageData.status === 'upcoming' && (
                  <button
                    onClick={handleMarkAsCurrent}
                    className="btn-primary flex items-center"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Set as Current
                  </button>
                )}
                {packageData.status === 'current' && !packageData.winner && (
                  <button
                    onClick={() => setShowWinnerModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Select Winner
                  </button>
                )}
                {packageData.status === 'current' && (
                  <button
                    onClick={handleCompleteDraw}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Draw
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Package Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-xl font-semibold mb-4">Package Details</h2>
            {editing ? (
              <form onSubmit={handleUpdatePackage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Package Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleFormChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Package ID</label>
                    <input
                      type="text"
                      name="packageId"
                      value={formData.packageId || ''}
                      onChange={handleFormChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Installment *</label>
                    <input
                      type="number"
                      name="monthlyInstallment"
                      value={formData.monthlyInstallment || ''}
                      onChange={handleFormChange}
                      className="input-field"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration || ''}
                      onChange={handleFormChange}
                      className="input-field"
                      placeholder="4 Days 3 Nights"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Couples *</label>
                    <input
                      type="number"
                      name="couples"
                      value={formData.couples || ''}
                      onChange={handleFormChange}
                      className="input-field"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Draw Date *</label>
                    <input
                      type="date"
                      name="drawDate"
                      value={formData.drawDate || ''}
                      onChange={handleFormChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Destinations *</label>
                    {(formData.destination || ['']).map((dest, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={dest}
                          onChange={(e) => handleArrayFieldChange('destination', index, e.target.value)}
                          className="input-field flex-1"
                          placeholder={`Destination ${index + 1}`}
                        />
                        {formData.destination.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('destination', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('destination')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Destination
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleFormChange}
                    className="input-field"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      fetchPackageDetails();
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{packageData.name}</h3>
                    <p className="text-sm text-gray-600">{packageData.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{packageData.monthlyInstallment?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{packageData.couples} Couples</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {packageData.destination?.map((dest, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {dest}
                    </span>
                  ))}
                </div>
                {packageData.description && (
                  <p className="text-gray-700">{packageData.description}</p>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Package Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Draw Date</p>
                  <p className="font-semibold">
                    {packageData.drawDate ? new Date(packageData.drawDate).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  {getStatusBadge(packageData.status)}
                </div>
                <div className="w-5 h-5 text-gray-400" />
              </div>
              {packageData.winner && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <div>
                    <p className="text-sm text-gray-600">Winner Selected</p>
                    <p className="font-semibold text-green-600">{packageData.winner.name}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Video */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Video className="w-4 h-4 mr-2" />
                Live Draw Video
              </h4>
              {packageData.liveVideoUrl ? (
                <div className="aspect-video rounded overflow-hidden mb-3">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(packageData.liveVideoUrl)}`}
                    className="w-full h-full"
                    allowFullScreen
                    title="Live Draw"
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No live video uploaded</p>
                </div>
              )}
              <button
                onClick={() => {
                  setVideoType('live');
                  setVideoFormData({ videoUrl: packageData.liveVideoUrl || '' });
                  setShowVideoModal(true);
                }}
                className="btn-primary w-full"
              >
                {packageData.liveVideoUrl ? 'Update' : 'Upload'} Live Video
              </button>
            </div>

            {/* Winner Video */}
            {packageData.winner?.feedbackVideo && (
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-yellow-600" />
                  Winner Feedback Video
                </h4>
                <div className="aspect-video rounded overflow-hidden mb-3">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(packageData.winner.feedbackVideo)}`}
                    className="w-full h-full"
                    allowFullScreen
                    title="Winner Feedback"
                  />
                </div>
                <button
                  onClick={() => {
                    setVideoType('feedback');
                    setVideoFormData({ videoUrl: packageData.winner.feedbackVideo || '' });
                    setShowVideoModal(true);
                  }}
                  className="btn-secondary w-full"
                >
                  Update Feedback Video
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Winner Section */}
        {packageData.winner ? (
          <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-600" />
              Lucky Winner
            </h3>
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{packageData.winner.name}</h4>
                <p className="text-sm text-gray-600">{packageData.winner.virtualCardNumber}</p>
                <p className="text-sm text-gray-500">{packageData.winner.city}</p>
                {packageData.winner.feedbackMessage && (
                  <p className="mt-2 italic text-sm bg-yellow-100 p-2 rounded">
                    "{packageData.winner.feedbackMessage}"
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : packageData.status === 'current' && (
          <div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <Crown className="w-5 h-5 mr-2 text-purple-600" />
                No Winner Selected Yet
              </h3>
              <button
                onClick={() => setShowWinnerModal(true)}
                className="btn-primary flex items-center"
              >
                <Star className="w-4 h-4 mr-2" />
                Choose Winner
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Update Modal */}
      <Modal
        isOpen={showVideoModal}
        onClose={() => {
          setShowVideoModal(false);
          setVideoFormData({ videoUrl: '' });
        }}
        title={`${videoType === 'live' ? 'Update Live' : 'Update Feedback'} Video`}
      
      >
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateVideo(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">YouTube Video URL *</label>
            <input
              type="url"
              value={videoFormData.videoUrl}
              onChange={(e) => setVideoFormData({ videoUrl: e.target.value })}
              className="input-field"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter full YouTube URL. Only YouTube links are supported.
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => {
                setShowVideoModal(false);
                setVideoFormData({ videoUrl: '' });
              }} 
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={formLoading || !videoFormData.videoUrl} className="btn-primary">
              {formLoading ? 'Updating...' : 'Update Video'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Winner Selection Modal */}
      <Modal 
        isOpen={showWinnerModal} 
        onClose={() => {
          setShowWinnerModal(false);
          setWinnerFormData({
            winnerId: '',
            feedbackMessage: '',
            feedbackVideo: ''
          });
          setSearchTerm('');
        }} 
        title="Select Lucky Winner" 
        size="xl"
      >
        <form onSubmit={handleSelectWinner} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Search Participants</label>
            <input
              type="text"
              placeholder="Search by name, card number, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field mb-4"
            />
            <div className="border border-gray-300 rounded-md p-3 max-h-60 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.slice(0, 15).map((user) => (
                  <label key={user._id} className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="radio"
                      name="winnerId"
                      value={user._id}
                      checked={winnerFormData.winnerId === user._id}
                      onChange={(e) => setWinnerFormData({ 
                        ...winnerFormData, 
                        winnerId: e.target.value 
                      })}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.virtualCardNumber} • {user.phone} • {user.city}
                      </p>
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No users found</p>
              )}
            </div>
          </div>
          
          {winnerFormData.winnerId && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Winner's Feedback Message (Optional)</label>
                <textarea
                  name="feedbackMessage"
                  value={winnerFormData.feedbackMessage}
                  onChange={(e) => setWinnerFormData({ 
                    ...winnerFormData, 
                    [e.target.name]: e.target.value 
                  })}
                  className="input-field"
                  rows={3}
                  placeholder="Enter winner's experience message..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Feedback Video URL (Optional)</label>
                <input
                  type="url"
                  name="feedbackVideo"
                  value={winnerFormData.feedbackVideo}
                  onChange={(e) => setWinnerFormData({ 
                    ...winnerFormData, 
                    [e.target.name]: e.target.value 
                  })}
                  className="input-field"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => {
                setShowWinnerModal(false);
                setWinnerFormData({
                  winnerId: '',
                  feedbackMessage: '',
                  feedbackVideo: ''
                });
                setSearchTerm('');
              }} 
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={formLoading || !winnerFormData.winnerId} 
              className="btn-primary"
            >
              {formLoading ? 'Selecting...' : 'Announce Winner & Complete Draw'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminPackageDetails;