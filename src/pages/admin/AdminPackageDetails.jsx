// src/pages/admin/AdminPackageDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/Layout/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from '../../components/Modal';
import { 
  Package, Video, Crown, Calendar, Users, MapPin, CheckCircle, 
  XCircle, Edit2, Save, Upload, Search, User, Star, Award, Gift,
  Eye, TrendingUp, PlayCircle, Clock
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
  const [videoType, setVideoType] = useState('live');

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
      const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
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
        prizeDescription: pkg.prizeDescription || '',
        drawDate: pkg.drawDate ? new Date(pkg.drawDate).toISOString().split('T')[0] : '',
        month: pkg.month,
        year: pkg.year,
        monthlyInstallment: pkg.monthlyInstallment,
        packageId: pkg.packageId,
        status: pkg.status
      });
    } catch (error) {
      toast.error('Failed to fetch package details');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/packages/${id}`, formData);
      setPackageData(response.data.data);
      setEditing(false);
      toast.success('Package updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update package');
    } finally {
      setFormLoading(false);
    }
  };

  const handleMarkAsCurrent = async () => {
    if (window.confirm('Mark this package as current? This will deactivate other current packages.')) {
      try {
        const updateResponse = await axios.put(`http://localhost:5000/api/packages/${id}`, {
          status: 'current'
        });
        setPackageData(updateResponse.data.data);
        toast.success('Package marked as current');
        fetchPackageDetails();
      } catch (error) {
        toast.error('Failed to mark as current');
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
        const response = await axios.put(`http://localhost:5000/api/packages/${id}`, { 
          status: 'draw_completed' 
        });
        setPackageData(response.data.data);
        toast.success('Package marked as completed');
        fetchPackageDetails();
      } catch (error) {
        toast.error('Failed to complete draw');
      }
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
      const winnerResponse = await axios.get(`http://localhost:5000/api/users/${winnerFormData.winnerId}`);
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
        status: 'draw_completed'
      };
      const response = await axios.put(`http://localhost:5000/api/packages/${id}`, updateData);
      setPackageData(response.data.data);
      toast.success('Winner selected and draw completed successfully!');
      setShowWinnerModal(false);
      setWinnerFormData({ winnerId: '', feedbackMessage: '', feedbackVideo: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to select winner');
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

  const getStatusConfig = (status) => {
    switch (status) {
      case 'upcoming': return { bg: 'bg-blue-500/10', text: 'text-blue-600', ring: 'ring-blue-200/30' };
      case 'current': return { bg: 'bg-emerald-500/15', text: 'text-emerald-600', ring: 'ring-emerald-200/40' };
      case 'draw_completed': return { bg: 'bg-amber-500/10', text: 'text-amber-600', ring: 'ring-amber-200/30' };
      default: return { bg: 'bg-slate-500/10', text: 'text-slate-600', ring: 'ring-slate-200/30' };
    }
  };

  const statusConfig = getStatusConfig(packageData?.status);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-50/70">
          <div className="w-28 h-28 bg-gradient-to-r from-blue-500/15 to-blue-600/15 rounded-3xl flex items-center justify-center backdrop-blur-md border border-blue-200/40">
            <LoadingSpinner size="lg" className="text-blue-500" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!packageData) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-50/70">
          <div className="w-24 h-24 bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm border border-slate-200/50">
            <Package className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-2xl font-light text-slate-800 mb-4 tracking-tight">Package Not Found</h3>
          <button
            onClick={() => navigate('/admin/packages')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Packages
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-50/80 p-6 md:p-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-2 tracking-tight">
              {packageData.name}
            </h1>
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200/50">
              <span className="text-sm font-semibold text-slate-700">{packageData.packageId}</span>
              <div className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.text} border border-white/40`}>
                <Clock className="w-3.5 h-3.5" />
                {packageData.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-end">
            {!editing && (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-gradient-to-r from-slate-500/90 to-slate-600/90 backdrop-blur-sm text-white text-sm py-3 px-6 rounded-2xl font-semibold flex items-center gap-2 border border-white/20 hover:from-slate-600/100 hover:to-slate-700/100 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Package
                </button>
                {packageData.status === 'upcoming' && (
                  <button
                    onClick={handleMarkAsCurrent}
                    className="bg-gradient-to-r from-emerald-500/90 to-green-500/90 backdrop-blur-sm text-white text-sm py-3 px-6 rounded-2xl font-semibold flex items-center gap-2 border border-white/20 hover:from-emerald-600/100 hover:to-green-600/100 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Star className="w-4 h-4" />
                    Set Live
                  </button>
                )}
                {packageData.status === 'current' && !packageData.winner && (
                  <button
                    onClick={() => setShowWinnerModal(true)}
                    className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white text-sm py-3 px-6 rounded-2xl font-semibold flex items-center gap-2 border border-white/20 hover:from-purple-600/100 hover:to-pink-600/100 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Crown className="w-4 h-4" />
                    Select Winner
                  </button>
                )}
                {packageData.status === 'current' && (
                  <button
                    onClick={handleCompleteDraw}
                    className="bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm text-white text-sm py-3 px-6 rounded-2xl font-semibold flex items-center gap-2 border border-white/20 hover:from-amber-600/100 hover:to-orange-600/100 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete Draw
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Package Hero */}
          <div className="lg:col-span-2 group">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-200/50 hover:border-blue-200/70 transition-all duration-500 h-full">
              {editing ? (
                <form onSubmit={handleUpdatePackage} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Package Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleFormChange}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Monthly Installment</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="monthlyInstallment"
                          value={formData.monthlyInstallment || ''}
                          onChange={handleFormChange}
                          className="w-full pl-12 py-4 pr-5 rounded-2xl border border-slate-200/60 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-semibold transition-all duration-300"
                          min="0"
                          required
                        />
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration || ''}
                        onChange={handleFormChange}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                        placeholder="4N/5D"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Couples Capacity</label>
                      <input
                        type="number"
                        name="couples"
                        value={formData.couples || ''}
                        onChange={handleFormChange}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-orange-300/70 focus:ring-2 focus:ring-orange-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Prize Description</label>
                    <input
                      type="text"
                      name="prizeDescription"
                      value={formData.prizeDescription || ''}
                      onChange={handleFormChange}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-orange-300/70 focus:ring-2 focus:ring-orange-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-semibold transition-all duration-300"
                      placeholder="e.g., 'Goa Luxury Family Trip (4 Members) OR 10g Gold'"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Destinations</label>
                    {(formData.destination || ['']).map((dest, index) => (
                      <div key={index} className="flex items-center gap-3 mb-3">
                        <input
                          type="text"
                          value={dest}
                          onChange={(e) => handleArrayFieldChange('destination', index, e.target.value)}
                          className="flex-1 px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                          placeholder={`Destination ${index + 1}`}
                        />
                        {(formData.destination?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('destination', index)}
                            className="p-3 text-slate-400 hover:text-red-500 transition-colors text-sm"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('destination')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Add Destination
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Draw Date</label>
                      <input
                        type="date"
                        name="drawDate"
                        value={formData.drawDate || ''}
                        onChange={handleFormChange}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Month/Year</label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          name="month"
                          value={formData.month || ''}
                          onChange={handleFormChange}
                          className="flex-1 px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                          placeholder="Dec"
                        />
                        <input
                          type="text"
                          name="year"
                          value={formData.year || ''}
                          onChange={handleFormChange}
                          className="flex-1 px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                          placeholder="2024"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Description</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleFormChange}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-slate-300/70 focus:ring-2 focus:ring-slate-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300 resize-vertical"
                      rows={4}
                      placeholder="Package highlights and details..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Inclusions</label>
                    {(formData.inclusions || ['']).map((inc, index) => (
                      <div key={index} className="flex items-center gap-3 mb-3">
                        <input
                          type="text"
                          value={inc}
                          onChange={(e) => handleArrayFieldChange('inclusions', index, e.target.value)}
                          className="flex-1 px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-500/30 bg-slate-50/50 backdrop-blur-sm text-sm font-medium transition-all duration-300"
                          placeholder={`Inclusion ${index + 1}`}
                        />
                        {(formData.inclusions?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('inclusions', index)}
                            className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('inclusions')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Add Inclusion
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        fetchPackageDetails();
                      }}
                      className="flex-1 bg-gradient-to-r from-slate-500/90 to-slate-600/90 backdrop-blur-sm text-white py-4 px-8 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border border-white/20 hover:from-slate-600/100 hover:to-slate-700/100 transition-all duration-300 hover:scale-[1.02]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600/95 to-emerald-600/95 backdrop-blur-md text-white py-4 px-8 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-400 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="w-4 h-4" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {packageData.prizeDescription && (
                    <div className="p-6 bg-gradient-to-r from-orange-50/90 to-yellow-50/80 backdrop-blur-sm rounded-3xl border border-orange-200/40">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-gradient-to-br from-orange-500/20 p-3 rounded-2xl border border-orange-200/40 flex-shrink-0">
                          <Star className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">{packageData.prizeDescription}</h3>
                          <p className="text-sm text-orange-600 font-medium flex items-center gap-2">
                            <Gift className="w-4 h-4" />
                            +25 Surprise Gifts Included
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-emerald-50/90 to-green-50/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <IndianRupee className="w-6 h-6 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-700">Monthly Plan</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900">
                        ₹{packageData.monthlyInstallment?.toLocaleString() || '0'}
                      </div>
                      <span className="text-xs text-emerald-600 font-semibold">per month</span>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-blue-50/90 to-slate-50/70 backdrop-blur-sm rounded-2xl border border-blue-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Capacity</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900">{packageData.couples}</div>
                      <span className="text-xs text-blue-600 font-semibold">Couples</span>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-slate-50/90 to-blue-50/70 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-6 h-6 text-slate-600" />
                        <span className="text-sm font-semibold text-slate-700">Duration</span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900">{packageData.duration}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        Destinations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {packageData.destination?.map((dest, index) => (
                          <span key={index} className="px-4 py-2 bg-gradient-to-r from-orange-100/80 to-blue-100/60 text-orange-700 text-sm font-semibold rounded-2xl border border-orange-200/50">
                            {dest}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {packageData.description && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <Package className="w-5 h-5 text-slate-600" />
                          Description
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50">
                          {packageData.description}
                        </p>
                      </div>
                    )}
                    
                    {packageData.inclusions?.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          What's Included
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {packageData.inclusions.slice(0, 8).map((inc, i) => (
                            <span key={i} className="px-3 py-2 bg-emerald-100/80 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-200/50">
                              {inc}
                            </span>
                          ))}
                          {packageData.inclusions.length > 8 && (
                            <span className="px-3 py-2 text-xs text-slate-500 font-semibold bg-slate-100/50 border border-slate-200/50 rounded-xl">
                              +{packageData.inclusions.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats & Status */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Package Status
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-slate-50/70 to-blue-50/30 rounded-2xl border border-slate-200/40">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Draw Date</p>
                    <p className="font-semibold text-slate-900">
                      {packageData.drawDate ? new Date(packageData.drawDate).toLocaleDateString('en-IN') : 'Not Set'}
                    </p>
                  </div>
                  <Calendar className="w-5 h-5 text-slate-500" />
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-slate-50/70 to-blue-50/30 rounded-2xl border border-slate-200/40">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Month/Year</p>
                    <p className="font-semibold text-slate-900">{packageData.month} {packageData.year}</p>
                  </div>
                  <Users className="w-5 h-5 text-slate-500" />
                </div>
                
                {packageData.winner ? (
                  <div className="py-3 px-4 bg-gradient-to-r from-emerald-50/90 to-green-50/70 rounded-2xl border border-emerald-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-600 text-xs uppercase tracking-wider font-semibold">Winner Selected</p>
                        <p className="font-bold text-slate-900 text-sm">{packageData.winner.name}</p>
                        <p className="text-xs text-slate-600">{packageData.winner.city}</p>
                      </div>
                      <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                        <Crown className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 px-4 bg-gradient-to-r from-purple-50/80 to-pink-50/60 rounded-2xl border border-purple-200/50">
                    <p className="text-purple-600 text-xs uppercase tracking-wider font-semibold">Awaiting Winner</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            {!editing && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 space-y-3">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  Quick Actions
                </h4>
                {packageData.status === 'upcoming' && (
                  <button
                    onClick={handleMarkAsCurrent}
                    className="w-full bg-gradient-to-r from-emerald-500/90 to-green-500/90 backdrop-blur-sm text-white text-sm py-3.5 px-5 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-white/20 hover:from-emerald-600/100 hover:to-green-600/100 transition-all duration-300"
                  >
                    <Star className="w-4 h-4" />
                    Activate Package
                  </button>
                )}
                {packageData.status === 'current' && !packageData.winner && (
                  <button
                    onClick={() => setShowWinnerModal(true)}
                    className="w-full bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white text-sm py-3.5 px-5 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-white/20 hover:from-purple-600/100 hover:to-pink-600/100 transition-all duration-300"
                  >
                    <Crown className="w-4 h-4" />
                    Select Winner
                  </button>
                )}
                {packageData.status === 'current' && (
                  <button
                    onClick={handleCompleteDraw}
                    className="w-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm text-white text-sm py-3.5 px-5 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-white/20 hover:from-amber-600/100 hover:to-orange-600/100 transition-all duration-300"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete Draw
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Videos Section */}
        {(packageData.liveVideoUrl || packageData.winner?.feedbackVideo) && (
          <div className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-200/50 hover:border-blue-200/70 transition-all duration-500">
              <h3 className="text-2xl font-light text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                <Video className="w-7 h-7 text-blue-500" />
                Video Content
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Live Draw Video */}
                {packageData.liveVideoUrl && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-blue-500" />
                      Live Draw Video
                    </h4>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900/20 backdrop-blur-sm border border-slate-200/50 shadow-xl">
                      <iframe
                        src={`https://www.youtube.com/embed/${packageData.liveVideoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]}`}
                        className="w-full h-full"
                        allowFullScreen
                        title="Live Draw Video"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setVideoType('live');
                        setVideoFormData({ videoUrl: packageData.liveVideoUrl });
                        setShowVideoModal(true);
                      }}
                      className="mt-4 w-full bg-gradient-to-r from-blue-500/90 to-emerald-500/90 backdrop-blur-sm text-white text-sm py-3 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-white/20 hover:from-blue-600/100 hover:to-emerald-600/100 transition-all duration-300"
                    >
                      <Upload className="w-4 h-4" />
                      Update Video
                    </button>
                  </div>
                )}

                {/* Winner Feedback Video */}
                {packageData.winner?.feedbackVideo && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      Winner Feedback
                    </h4>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900/20 backdrop-blur-sm border border-slate-200/50 shadow-xl">
                      <iframe
                        src={`https://www.youtube.com/embed/${packageData.winner.feedbackVideo.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]}`}
                        className="w-full h-full"
                        allowFullScreen
                        title="Winner Feedback Video"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setVideoType('feedback');
                        setVideoFormData({ videoUrl: packageData.winner.feedbackVideo });
                        setShowVideoModal(true);
                      }}
                      className="mt-4 w-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm text-white text-sm py-3 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 border border-white/20 hover:from-amber-600/100 hover:to-orange-600/100 transition-all duration-300"
                    >
                      <Upload className="w-4 h-4" />
                      Update Video
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Winner Showcase */}
        {packageData.winner && (
          <div className="group">
            <div className="bg-gradient-to-r from-amber-50/95 to-orange-50/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center border-2 border-amber-200/40">
                  <Crown className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-slate-900 mb-1 tracking-tight">Lucky Winner</h3>
                  <p className="text-lg font-semibold text-amber-600">{packageData.winner.name}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 text-center">
                  <User className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-900">{packageData.winner.name}</p>
                  <p className="text-xs text-slate-500">{packageData.winner.virtualCardNumber}</p>
                </div>
                <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 text-center">
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-900">{packageData.winner.city}</p>
                  <p className="text-xs text-slate-500">Location</p>
                </div>
                <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 text-center">
                  <Phone className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-900">{packageData.winner.phone}</p>
                  <p className="text-xs text-slate-500">Contact</p>
                </div>
              </div>
              
              {packageData.winner.feedbackMessage && (
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50">
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{packageData.winner.feedbackMessage}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Video Modal */}
      <Modal isOpen={showVideoModal} onClose={() => {
        setShowVideoModal(false);
        setVideoFormData({ videoUrl: '' });
      }} title={`${videoType === 'live' ? 'Live Draw' : 'Winner Feedback'} Video`} size="md">
        <form onSubmit={(e) => { e.preventDefault(); /* handleUpdateVideo logic */ }} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">YouTube URL</label>
            <input
              type="url"
              value={videoFormData.videoUrl}
              onChange={(e) => setVideoFormData({ videoUrl: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm transition-all duration-300"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button type="button" className="flex-1 bg-gradient-to-r from-slate-500/90 to-slate-600/90 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border border-white/20 hover:from-slate-600/100 hover:to-slate-700/100 transition-all duration-300" onClick={() => setShowVideoModal(false)}>
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600/95 to-emerald-600/95 backdrop-blur-md text-white py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-400 hover:scale-[1.02]">
              Update Video
            </button>
          </div>
        </form>
      </Modal>

      {/* Winner Modal */}
      <Modal isOpen={showWinnerModal} onClose={() => {
        setShowWinnerModal(false);
        setWinnerFormData({ winnerId: '', feedbackMessage: '', feedbackVideo: '' });
        setSearchTerm('');
      }} title="Select Lucky Winner" size="xl">
        <div className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Search participants by name, card, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm transition-all duration-300"
            />
          </div>
          <div className="max-h-96 overflow-y-auto border border-slate-200/50 rounded-2xl p-4 bg-slate-50/50 backdrop-blur-sm">
            {filteredUsers.slice(0, 20).map((user) => (
              <label key={user._id} className="flex items-center p-4 hover:bg-white/80 rounded-xl cursor-pointer transition-colors gap-4">
                <input
                  type="radio"
                  name="winnerId"
                  value={user._id}
                  checked={winnerFormData.winnerId === user._id}
                  onChange={(e) => setWinnerFormData({ 
                    ...winnerFormData, 
                    winnerId: e.target.value 
                  })}
                  className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-600 truncate">{user.virtualCardNumber}</p>
                  <p className="text-xs text-slate-500">{user.phone} • {user.city}</p>
                </div>
              </label>
            ))}
          </div>
          {winnerFormData.winnerId && (
            <div className="space-y-4 pt-4 border-t border-slate-200/50">
              <textarea
                name="feedbackMessage"
                value={winnerFormData.feedbackMessage}
                onChange={(e) => setWinnerFormData({ 
                  ...winnerFormData, 
                  [e.target.name]: e.target.value 
                })}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-500/30 bg-slate-50/50 backdrop-blur-sm text-sm resize-vertical"
                rows={3}
                placeholder="Optional: Winner's feedback message"
              />
              <input
                type="url"
                name="feedbackVideo"
                value={winnerFormData.feedbackVideo}
                onChange={(e) => setWinnerFormData({ 
                  ...winnerFormData, 
                  [e.target.name]: e.target.value 
                })}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200/60 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-500/30 bg-slate-50/50 backdrop-blur-sm text-sm transition-all duration-300"
                placeholder="Optional: Feedback video URL"
              />
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              className="flex-1 bg-gradient-to-r from-slate-500/90 to-slate-600/90 backdrop-blur-sm text-white py-4 px-8 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border border-white/20 hover:from-slate-600/100 hover:to-slate-700/100 transition-all duration-300"
              onClick={() => {
                setShowWinnerModal(false);
                setWinnerFormData({ winnerId: '', feedbackMessage: '', feedbackVideo: '' });
                setSearchTerm('');
              }}
            >
              Cancel
            </button>
            <button 
              type="button" 
              disabled={formLoading || !winnerFormData.winnerId}
              onClick={handleSelectWinner}
              className="flex-1 bg-gradient-to-r from-emerald-500/95 to-green-500/95 backdrop-blur-md text-white py-4 px-8 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-400 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formLoading ? (
                <>
                  <LoadingSpinner size="sm" className="w-4 h-4" />
                  Announcing...
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4" />
                  Announce Winner
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default AdminPackageDetails;
