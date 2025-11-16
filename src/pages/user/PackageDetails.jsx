import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../../components/Layout/UserLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ArrowLeft, MapPin, Clock, Users, Calendar, Play, Crown, Star, Gift, CheckCircle, Phone, Map as MapIcon, Heart } from 'lucide-react';
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

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </UserLayout>
    );
  }

  if (!packageData) {
    return (
      <UserLayout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Package not found</h3>
          <button
            onClick={() => navigate('/lucky-draw')}
            className="btn-primary"
          >
            Back to Lucky Draw
          </button>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/lucky-draw')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Lucky Draw
          </button>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            packageData.status === 'current' ? 'bg-green-100 text-green-800' :
            packageData.status === 'draw_completed' ? 'bg-gray-100 text-gray-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {packageData.status === 'draw_completed' ? 'Completed' : 
             packageData.status === 'current' ? 'Current' : 'Upcoming'}
          </span>
        </div>

        {/* Package Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="md:flex items-start justify-between">
            <div className="flex-1 mb-6">
              <h1 className="text-3xl font-bold mb-4">{packageData.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-100">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm opacity-75">Destination</p>
                    <p className="font-medium">{packageData.destination.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm opacity-75">Duration</p>
                    <p className="font-medium">{packageData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm opacity-75">Couples</p>
                    <p className="font-medium">{packageData.couples} Couples</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:text-right ml-8">
              <p className="text-sm text-blue-100 mb-1">Monthly Installment</p>
              <p className="text-4xl font-bold">₹{packageData.monthlyInstallment}</p>
              <p className="text-blue-100 mt-2">{packageData.month} {packageData.year}</p>
            </div>
          </div>
        </div>

        {/* Package Images */}
        {packageData.images && packageData.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packageData.images.map((image, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-md">
                <img
                  src={image}
                  alt={`${packageData.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Package Description</h2>
              <p className="text-gray-700 leading-relaxed">{packageData.description}</p>
            </div>

            {/* Inclusions */}
            {packageData.inclusions && packageData.inclusions.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {packageData.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Video for Completed Packages */}
            {packageData.status === 'draw_completed' && packageData.liveVideoUrl && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Play className="w-6 h-6 mr-2 text-red-500" />
                  Live Draw Video
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={getYouTubeEmbedUrl(packageData.liveVideoUrl)}
                    title="Live Draw Video"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Current Package Message */}
            {packageData.status === 'current' && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Gift className="w-8 h-8 text-yellow-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Live Draw Coming Soon!</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Get ready for the most exciting moment! The live draw for this amazing package will be conducted on{' '}
                  <span className="font-bold text-yellow-700">
                    {new Date(packageData.drawDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>.
                </p>
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <p className="text-gray-800 font-medium mb-2">🌟 Stay positive and keep dreaming!</p>
                  <p className="text-gray-600 text-sm">
                    Your participation makes you eligible for this incredible journey. Best of luck to all participants!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Package Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Package Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Draw Date</span>
                  <span className="font-medium">
                    {new Date(packageData.drawDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Participants</span>
                  <span className="font-medium">{packageData.totalParticipants || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-medium text-green-600">
                    ₹{(packageData.totalRevenue || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Package ID</span>
                  <span className="font-medium text-blue-600">{packageData.packageId}</span>
                </div>
              </div>
            </div>

            {/* Winner Details for Completed Packages */}
            {packageData.status === 'draw_completed' && packageData.winner && (
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-20 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-20 rounded-full -ml-8 -mb-8"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <Crown className="w-8 h-8 text-yellow-200 mr-3" />
                    <h3 className="text-xl font-bold">🎉 Winner Announced!</h3>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        <span className="font-medium">{packageData.winner.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Gift className="w-4 h-4 mr-2" />
                        <span className="text-sm">{packageData.winner.virtualCardNumber}</span>
                      </div>
                      <div className="flex items-center">
                        <MapIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">{packageData.winner.city}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{packageData.winner.phone}</span>
                      </div>
                    </div>
                  </div>

                  {packageData.winner.feedbackMessage && (
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-2">
                        <Heart className="w-4 h-4 mr-2" />
                        <span className="font-medium text-sm">Winner's Feedback</span>
                      </div>
                      <p className="text-sm italic">"{packageData.winner.feedbackMessage}"</p>
                    </div>
                  )}

                  {packageData.winner.feedbackVideo && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Winner's Video Feedback</p>
                      <div className="aspect-video rounded-lg overflow-hidden bg-black bg-opacity-20">
                        <iframe
                          src={getYouTubeEmbedUrl(packageData.winner.feedbackVideo)}
                          title="Winner Feedback Video"
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
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