import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../../components/Layout/UserLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Trophy, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  Play,
  Crown,
  Star,
  Gift
} from 'lucide-react';
import toast from 'react-hot-toast';

const LuckyDrawPlayground = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/user/packages/playground');
      setPackages(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-gradient-to-r from-green-400 to-blue-500 text-white';
      case 'draw_completed':
        return 'bg-gray-100 text-gray-700';
      case 'upcoming':
        return 'bg-white text-gray-900 border border-gray-200';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'draw_completed':
        return 'bg-gray-100 text-gray-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePackageClick = (packageId) => {
    navigate(`/package/${packageId}`);
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

  const currentPackage = packages.find(pkg => pkg.status === 'current');
  const otherPackages = packages.filter(pkg => pkg.status !== 'current');

  return (
    <UserLayout>
      <div className="space-y-8 p-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lucky Draw Playground</h1>
          <p className="text-gray-600">Explore all packages and check your lucky draw status</p>
        </div>

        {/* Current Month Package */}
        {currentPackage && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg transform rotate-1"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-8 border-2 border-yellow-400">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
                  <Trophy className="w-4 h-4 mr-2" />
                  Current Month's Lucky Draw
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🎉 All the Best for this Month's Lucky Draw!
                </h2>
                <p className="text-gray-600">You're participating in this amazing package</p>
              </div>

              <div 
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => handlePackageClick(currentPackage._id)}
              >
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{currentPackage.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          {currentPackage.destination.join(', ')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          {currentPackage.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-500" />
                          {currentPackage.couples} Couples
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <p className="text-sm text-gray-600">Monthly Installment</p>
                      <p className="text-2xl font-bold text-green-600">₹{currentPackage.monthlyInstallment}</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mt-2">
                        {currentPackage.month} {currentPackage.year}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed">{currentPackage.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Draw Date: {new Date(currentPackage.drawDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">
                          <Users className="w-4 h-4 inline mr-1" />
                          {currentPackage.totalParticipants} Participants
                        </span>
                        <span className="text-green-600 font-medium">
                          ₹{currentPackage.totalRevenue?.toLocaleString()} Revenue
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Packages */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPackages.map((pkg) => (
              <div
                key={pkg._id}
                className={`rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ${getStatusColor(pkg.status)}`}
                onClick={() => handlePackageClick(pkg._id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
                    <div className="space-y-2 text-sm opacity-90">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {pkg.destination.join(', ')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {pkg.couples} Couples
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(pkg.status)}`}>
                      {pkg.status === 'draw_completed' ? 'Completed' : 
                       pkg.status === 'current' ? 'Current' : 'Upcoming'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-opacity-20 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-75">Monthly Installment</p>
                      <p className="text-xl font-bold">₹{pkg.monthlyInstallment}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-75">{pkg.month} {pkg.year}</p>
                      {pkg.status === 'draw_completed' && pkg.winner && (
                        <div className="flex items-center mt-1">
                          <Crown className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">Winner Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {pkg.status === 'draw_completed' && (
                  <div className="mt-4 pt-4 border-t border-opacity-20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Play className="w-4 h-4 mr-1" />
                        Live Video Available
                      </span>
                      <span className="flex items-center">
                        <Gift className="w-4 h-4 mr-1" />
                        Winner Announced
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Packages Available</h3>
            <p className="text-gray-500">Check back later for exciting travel packages!</p>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default LuckyDrawPlayground;