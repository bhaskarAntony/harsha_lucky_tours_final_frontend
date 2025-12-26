// src/pages/member/MemberPackageDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../../components/Layout/UserLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  ArrowLeft, MapPin, Clock, Users, Calendar, Play, Crown, Star, Gift, CheckCircle, 
  Phone, Map, Heart, Package, IndianRupee, Eye, Trophy, Users as UsersIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MemberPackageDetails = () => {
  const { id } = useParams();
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackageDetails();
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
      setPackageData(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch package details');
      navigate('/lucky-draw');
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-200/40 shadow-xl">
            <LoadingSpinner size="lg" className="text-blue-500" />
          </div>
        </div>
      </UserLayout>
    );
  }

  if (!packageData) {
    return (
      <UserLayout>
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Package Not Found</h3>
          <p className="text-sm text-slate-600 mb-8 max-w-sm">The package you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/lucky-draw')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Packages
          </button>
        </div>
      </UserLayout>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'upcoming': return { bg: 'bg-blue-50/80', text: 'text-blue-600', ring: 'ring-blue-200/30' };
      case 'current': return { bg: 'bg-emerald-50/90', text: 'text-emerald-600', ring: 'ring-emerald-200/40' };
      case 'draw_completed': return { bg: 'bg-amber-50/80', text: 'text-amber-600', ring: 'ring-amber-200/30' };
      default: return { bg: 'bg-slate-50/80', text: 'text-slate-600', ring: 'ring-slate-200/30' };
    }
  };

  const statusStyle = getStatusStyle(packageData.status);

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-50/70 p-4 md:p-6 lg:p-8">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0  bg-white/90 backdrop-blur-sm border-b border-slate-200/50 pb-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/lucky-draw')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Packages
            </button>
            <div className={`px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-sm ${statusStyle.bg} ${statusStyle.text} border border-white/50`}>
              <Clock className="w-3 h-3" />
              {packageData.status === 'current' ? 'Live' : packageData.status === 'draw_completed' ? 'Completed' : 'Upcoming'}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8">
            
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-blue-600/95 via-blue-700/90 to-indigo-600/95 backdrop-blur-md rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-white/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent blur-xl"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start lg:items-center">
                <div className="lg:col-span-2">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-4 drop-shadow-lg">
                    {packageData.name}
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-100 text-sm">
                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{packageData.destination.slice(0, 2).join(' • ')}{packageData.destination.length > 2 && '...'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{packageData.month} {packageData.year}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                      <UsersIcon className="w-4 h-4 shrink-0" />
                      <span>{packageData.couples} Couples</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 mb-4">
                    <p className="text-xs text-blue-200 uppercase tracking-wider font-medium mb-2">Monthly</p>
                    <div className="flex items-baseline gap-1">
                      <IndianRupee className="w-5 h-5 text-emerald-300 shrink-0" />
                      <span className="text-3xl font-semibold tracking-tight">{packageData.monthlyInstallment?.toLocaleString()}</span>
                      <span className="text-sm">/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prize Highlight */}
            {packageData.prizeDescription && (
              <div className="p-6 bg-gradient-to-br from-orange-50/90 via-yellow-50/70 to-orange-50/90 backdrop-blur-sm rounded-3xl border border-orange-200/40 shadow-xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-orange-500/20 p-3 rounded-2xl border border-orange-200/40 shrink-0">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">{packageData.prizeDescription}</h2>
                    <p className="text-sm text-orange-600 font-medium flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      +25 Surprise Gifts for Members
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gradient-to-r from-orange-100/80 to-orange-200/60 text-orange-700 px-3 py-1.5 rounded-full font-semibold border border-orange-200/50">1 Family (4 Members)</span>
                  <span className="text-xs bg-gradient-to-r from-yellow-100/80 to-yellow-200/60 text-yellow-700 px-3 py-1.5 rounded-full font-semibold border border-yellow-200/50">OR Gold/Silver</span>
                </div>
              </div>
            )}

            {/* Images Gallery */}
            {packageData.images && packageData.images.length > 0 && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                  {packageData.images.slice(0, 6).map((image, index) => (
                    <div key={index} className="aspect-video rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                      <img
                        src={image}
                        alt={`${packageData.name} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
                {packageData.images.length > 6 && (
                  <div className="text-center mt-4">
                    <span className="text-xs text-slate-500">+{packageData.images.length - 6} more photos</span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {packageData.description && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-slate-600" />
                  <h2 className="text-xl font-semibold text-slate-900">About This Package</h2>
                </div>
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                  <p>{packageData.description}</p>
                </div>
              </div>
            )}

            {/* Inclusions */}
            {packageData.inclusions?.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-slate-900">What's Included</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageData.inclusions.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/40 hover:bg-emerald-50/70 transition-colors">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Video */}
            {packageData.status === 'draw_completed' && packageData.liveVideoUrl && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Play className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-semibold text-slate-900">Live Draw Video</h2>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={getYouTubeEmbedUrl(packageData.liveVideoUrl)}
                    title="Live Draw Video"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Current Package Notice */}
            {packageData.status === 'current' && (
              <div className="bg-gradient-to-r from-emerald-50/90 to-green-50/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-200/50 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border-2 border-emerald-200/50">
                    <Gift className="w-6 h-6 text-emerald-600 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-1">Live Draw Active!</h2>
                    <p className="text-sm text-emerald-700 font-medium">Draw Date: {new Date(packageData.drawDate).toLocaleDateString('en-US', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Your ticket is active! Stay tuned for the live draw. Every participant has an equal chance to win this amazing package.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 lg:h-screen lg:overflow-y-auto space-y-6">
            {/* Package Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-lg">
              <h3 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                Package Info
              </h3>
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-slate-200/50 last:border-b-0">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Draw Date
                  </span>
                  <span className="font-semibold text-slate-900">
                    {new Date(packageData.drawDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-200/50 last:border-b-0">
                  <span className="text-slate-600 flex items-center gap-2">
                    <UsersIcon className="w-4 h-4" />
                    Participants
                  </span>
                  <span className="font-semibold text-slate-900">{packageData.totalParticipants || 0}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-200/50 last:border-b-0">
                  <span className="text-slate-600 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" />
                    Revenue
                  </span>
                  <span className="font-semibold text-emerald-600">₹{(packageData.totalRevenue || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Package ID
                  </span>
                  <span className="font-semibold text-blue-600">{packageData.packageId}</span>
                </div>
              </div>
            </div>

            {/* Winner Card */}
            {packageData.status === 'draw_completed' && packageData.winner && (
              <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-200/50 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 rounded-xl flex items-center justify-center border border-amber-200/40">
                    <Crown className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Winner Announced</h4>
                    <p className="text-xs text-amber-600">Congratulations!</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50">
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-semibold text-slate-700">W</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 line-clamp-1">{packageData.winner.name}</p>
                      <p className="text-slate-600">{packageData.winner.city}</p>
                    </div>
                  </div>
                  {packageData.winner.phone && (
                    <div className="flex items-center gap-2 text-slate-700 p-2 bg-slate-50/50 rounded-lg border border-slate-200/50">
                      <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-[10px]">{packageData.winner.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {
              isAuthenticated && (
 <div className="bg-gradient-to-r from-blue-600/95 to-blue-700/95 backdrop-blur-md rounded-3xl p-1 shadow-2xl border border-white/20">
              <Link
                to={`/register/${packageData._id}`}
                className="block w-full bg-white/90 backdrop-blur-sm text-blue-700 text-sm font-semibold py-4 px-6 rounded-2xl text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 hover:bg-white/100"
              >
                <Gift className="w-4 h-4" />
                Register Now - ₹{packageData.monthlyInstallment}/month
              </Link>
            </div>
              )
            }
           

            {/* Quick Links */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 border border-slate-200/50">
              <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Quick Links
              </h4>
              <div className="space-y-2">
                <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100/50 transition-colors text-xs text-slate-700">
                  <Eye className="w-4 h-4 shrink-0" />
                  View All Packages
                </button>
                <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100/50 transition-colors text-xs text-slate-700">
                  <UsersIcon className="w-4 h-4 shrink-0" />
                  My Registrations
                </button>
                <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100/50 transition-colors text-xs text-slate-700">
                  <Gift className="w-4 h-4 shrink-0 text-orange-500" />
                  Past Winners
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MemberPackageDetails;
