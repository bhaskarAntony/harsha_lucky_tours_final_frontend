// src/pages/member/PackageDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../../components/Layout/UserLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  ArrowLeft, MapPin, Clock, Users, Calendar, Play, Crown, Star, Gift, CheckCircle, 
  Phone, Map, Heart, Package, IndianRupee, Eye, Trophy 
} from 'lucide-react';
import toast from 'react-hot-toast';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackageDetails();
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${id}`);
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

  const getStatusConfig = (status) => {
    switch (status) {
      case 'upcoming': return { label: 'Upcoming', bg: 'bg-blue-500/10', text: 'text-blue-600', icon: Clock };
      case 'current': return { label: 'Live Now', bg: 'bg-emerald-500/15', text: 'text-emerald-600', icon: Gift };
      case 'draw_completed': return { label: 'Completed', bg: 'bg-amber-500/10', text: 'text-amber-600', icon: Trophy };
      default: return { label: status, bg: 'bg-slate-500/10', text: 'text-slate-600', icon: Clock };
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-50/70">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500/15 to-blue-600/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-blue-200/40">
            <LoadingSpinner size="md" className="text-blue-500 w-8 h-8" />
          </div>
        </div>
      </UserLayout>
    );
  }

  if (!packageData) {
    return (
      <UserLayout>
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-50/70">
          <div className="w-20 h-20 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-slate-200/50">
            <Package className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-light text-slate-800 mb-4 tracking-tight">Package Not Found</h3>
          <Link
            to="/lucky-draw"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            Back to Packages
          </Link>
        </div>
      </UserLayout>
    );
  }

  const status = getStatusConfig(packageData.status);
  const StatusIcon = status.icon;

  return (
    <UserLayout>
      <div className="min-h-[80vh] bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-50/80 p-3 md:p-4 lg:p-6">
        
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200/50 py-4 mb-6 rounded-b-2xl">
          <div className="flex items-center justify-between px-4">
            <button
              onClick={() => navigate('/lucky-draw')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100/80 transition-all duration-300 text-xs backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Packages
            </button>
            <div className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold flex items-center gap-1 shadow-sm ${status.bg} ${status.text} border border-white/40 backdrop-blur-sm`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {status.label}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hero Header */}
            <div className="relative group bg-gradient-to-r from-blue-600/95 via-blue-700/90 to-emerald-600/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 text-white shadow-xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-4 drop-shadow-lg tracking-tight">
                    {packageData.name}
                  </h1>
                  <div className="grid grid-cols-2 gap-3 text-blue-100 text-xs">
                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{packageData.destination?.slice(0, 2).join(' • ')}{packageData.destination?.length > 2 && '...'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{packageData.month} {packageData.year}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right lg:text-center">
                  <div className="bg-white/20 backdrop-blur-sm p-4 lg:p-6 rounded-2xl border border-white/30">
                    <p className="text-[10px] text-blue-200 uppercase tracking-wider font-medium mb-2 opacity-90">Monthly Installment</p>
                    <div className="flex items-baseline gap-1 justify-center lg:justify-end">
                      <IndianRupee className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                      <span className="text-3xl lg:text-4xl font-semibold tracking-tight">{packageData.monthlyInstallment?.toLocaleString()}</span>
                      <span className="text-sm font-medium">/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prize Highlight */}
            {packageData.prizeDescription && (
              <div className="group">
                <div className="p-6 lg:p-8 bg-gradient-to-br from-orange-50/95 via-yellow-50/80 to-orange-50/90 backdrop-blur-sm rounded-2xl border border-orange-200/40 hover:border-orange-300/70 transition-all duration-500">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-orange-500/20 p-3 lg:p-4 rounded-2xl border-2 border-orange-200/40 shadow-lg flex-shrink-0 group-hover:scale-110 transition-all duration-500">
                      <Star className="w-6 lg:w-7 h-6 lg:h-7 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg lg:text-xl font-light text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-orange-700 transition-colors text-sm">
                        {packageData.prizeDescription}
                      </h2>
                      <p className="text-sm lg:text-base text-orange-600 font-semibold flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        +25 Surprise Gifts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {packageData.images && packageData.images.length > 0 && (
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-200/50 shadow-lg">
                  <h3 className="text-lg lg:text-xl font-light text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
                    <Eye className="w-6 h-6 text-blue-500" />
                    Gallery Preview
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {packageData.images.slice(0, 6).map((image, index) => (
                      <div key={index} className="group/image relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-100/60 to-slate-200/40 border border-slate-200/50 hover:border-blue-200/70 transition-all duration-500 hover:-translate-y-1">
                        <img
                          src={image}
                          alt={`${packageData.name} ${index + 1}`}
                          className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 flex items-end p-2">
                          <span className="text-white text-[10px] font-semibold uppercase tracking-wider">Photo {index + 1}</span>
                        </div>
                      </div>
                    ))}
                    {packageData.images.length > 6 && (
                      <div className="col-span-1 aspect-video bg-gradient-to-br from-slate-100/70 to-slate-200/50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300/60 text-slate-400 group-hover:border-blue-300/70 transition-all">
                        <span className="text-[10px] font-semibold uppercase tracking-wider">+{packageData.images.length - 6} more</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Description & Inclusions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Description */}
              {packageData.description && (
                <div className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-200/50 hover:border-blue-200/70 transition-all duration-500 h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <Package className="w-5 h-5 text-slate-600" />
                      <h3 className="text-base lg:text-lg font-light text-slate-900 tracking-tight">Highlights</h3>
                    </div>
                    <div className="prose prose-xs lg:prose-sm max-w-none text-slate-700 leading-relaxed space-y-3">
                      <p className="text-sm">{packageData.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Inclusions */}
              {packageData.inclusions?.length > 0 && (
                <div className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-200/50 hover:border-emerald-200/70 transition-all duration-500 h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-base lg:text-lg font-light text-slate-900 tracking-tight">Included</h3>
                    </div>
                    <div className="space-y-2">
                      {packageData.inclusions.slice(0, 8).map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/50 hover:bg-emerald-50/90 transition-all group-hover/parent:translate-x-1">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-slate-700 leading-relaxed">{item}</span>
                        </div>
                      ))}
                      {packageData.inclusions.length > 8 && (
                        <div className="text-center py-4 bg-slate-50/70 rounded-xl border border-slate-200/50">
                          <span className="text-xs text-slate-500 font-semibold">+{packageData.inclusions.length - 8} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Draw Video */}
            {packageData.status === 'draw_completed' && packageData.liveVideoUrl && (
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-200/50 hover:border-red-200/70 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/15 to-red-600/15 rounded-2xl flex items-center justify-center border-2 border-red-200/50">
                      <Play className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-light text-slate-900 mb-1 tracking-tight">Live Draw</h3>
                      <p className="text-sm text-slate-600 font-medium">Watch the moment</p>
                    </div>
                  </div>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 bg-gradient-to-b from-slate-900/20">
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
              </div>
            )}

            {/* Current Package Notice */}
            {packageData.status === 'current' && (
              <div className="group">
                <div className="p-8 lg:p-10 bg-gradient-to-r from-emerald-50/95 to-green-50/90 backdrop-blur-sm rounded-2xl border-2 border-emerald-200/60 shadow-lg hover:border-emerald-300/80 transition-all duration-500">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center border-2 border-emerald-300/60 animate-pulse">
                      <Gift className="w-8 lg:w-10 h-8 lg:h-10 text-emerald-600" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl lg:text-2xl font-light text-slate-900 mb-2 tracking-tight">Live Draw Active!</h3>
                      <p className="text-lg lg:text-xl text-emerald-600 font-semibold text-sm">
                        {new Date(packageData.drawDate).toLocaleDateString('en-IN', { 
                          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-emerald-200/50 shadow-lg max-w-2xl mx-auto">
                    <p className="text-base lg:text-lg text-slate-800 font-semibold mb-6 leading-relaxed text-center text-sm">
                      Your ticket is active! Equal chance for all.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto space-y-6 lg:pr-2">
            
            {/* Quick Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-200/50 shadow-lg sticky lg:static top-4 z-10 lg:z-auto">
              <h4 className="text-base lg:text-lg font-light text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
                <Package className="w-6 h-6 text-blue-500" />
                Quick Info
              </h4>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-slate-50/80 to-blue-50/40 rounded-xl border border-slate-200/50">
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider mb-0.5">Draw Date</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(packageData.drawDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <Calendar className="w-5 h-5 text-slate-500" />
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-emerald-50/80 to-green-50/40 rounded-xl border border-emerald-200/50">
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider mb-0.5">Monthly</p>
                    <p className="font-bold text-emerald-600">₹{packageData.monthlyInstallment?.toLocaleString()}</p>
                  </div>
                  <IndianRupee className="w-5 h-5 text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-blue-50/80 to-slate-50/40 rounded-xl border border-blue-200/50">
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider mb-0.5">ID</p>
                    <p className="font-semibold text-blue-600">{packageData.packageId}</p>
                  </div>
                  <Eye className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link
                to={`/member/register/${packageData._id}`}
                className="group block w-full bg-gradient-to-r from-blue-600/95 to-emerald-600/95 backdrop-blur-md text-white text-sm py-4 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-400 hover:scale-[1.03] hover:-translate-y-0.5 flex items-center justify-center gap-2 text-center"
              >
                <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Join Now
              </Link>
              
              <Link
                to="/lucky-draw"
                className="block w-full bg-white/90 backdrop-blur-sm text-slate-800 text-sm py-3.5 px-6 rounded-2xl font-semibold border-2 border-slate-200/50 hover:bg-slate-50 hover:border-slate-300/70 shadow-lg hover:shadow-xl transition-all duration-400 hover:scale-[1.02] flex items-center justify-center gap-2 text-center"
              >
                <Eye className="w-5 h-5" />
                All Packages
              </Link>
            </div>

            {/* Winner Showcase */}
            {packageData.status === 'draw_completed' && packageData.winner && (
              <div className="group">
                <div className="bg-gradient-to-br from-amber-50/95 to-orange-50/85 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border-2 border-amber-200/40 group-hover:scale-110 transition-all">
                      <Crown className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h5 className="text-sm lg:text-base font-light text-slate-900 tracking-tight">🏆 Lucky Winner</h5>
                      <p className="text-amber-600 font-semibold text-xs">{packageData.winner.name}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-slate-700 font-semibold">{packageData.winner.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700 font-semibold">{packageData.winner.phone}</span>
                    </div>
                  </div>
                  
                  {packageData.winner.feedbackMessage && (
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50">
                      <p className="text-xs text-slate-700 italic leading-tight text-center">
                        "{packageData.winner.feedbackMessage}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default PackageDetails;
