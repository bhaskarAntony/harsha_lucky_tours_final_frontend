import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import {
  Calendar, Users, MapPin, IndianRupee, Clock, Trophy,
  PlayCircle, Crown, CheckCircle, Gift, Loader2, Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const Pack = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------------------------------------------
  // FETCH PACKAGES
  // -----------------------------------------------------------------
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/packages');
        setPackages(data.data || []);
      } catch (err) {
        toast.error('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // -----------------------------------------------------------------
  // STATUS HELPERS
  // -----------------------------------------------------------------
  const getStatusConfig = (status) => {
    switch (status) {
      case 'upcoming':
        return {
          label: 'Upcoming',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: Clock,
        };
      case 'current':
        return {
          label: 'Current',
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: Gift,
        };
      case 'draw_completed':
        return {
          label: 'Completed',
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: Trophy,
        };
      default:
        return {
          label: 'Unknown',
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: Clock,
        };
    }
  };

  // -----------------------------------------------------------------
  // PACKAGE CARD COMPONENT
  // -----------------------------------------------------------------
  const PackageCard = ({ p }) => {
    const status = getStatusConfig(p.status);
    const StatusIcon = status.icon;
    const isCompleted = p.status === 'draw_completed';
    const winner = p.winner;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* IMAGE */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={p.images?.[0] || '/placeholder.jpg'}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* STATUS BADGE */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${status.bg} ${status.text} border ${status.border}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {status.label}
            </span>
          </div>

          {/* WINNER BADGE (COMPLETED) */}
          {isCompleted && winner && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Crown className="w-3.5 h-3.5" />
                Winner!
              </span>
            </div>
          )}

          {/* TITLE & DESTINATION */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-1">{p.name}</h3>
            <p className="text-sm opacity-90 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {p.destination?.join(' • ') || '—'}
            </p>
            <p className="text-xs opacity-80 mt-1">
              {p.month} {p.year}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 md:p-6">
          {/* KEY INFO GRID */}
          <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <div>
                <p className="text-xs opacity-75">Draw Date</p>
                <p className="font-semibold">
                  {format(new Date(p.drawDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-purple-600" />
              <div>
                <p className="text-xs opacity-75">Couples</p>
                <p className="font-semibold">{p.couples}</p>
              </div>
            </div>
          </div>

          {/* PRICE & REVENUE */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500">Monthly Installment</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{p.monthlyInstallment?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="font-medium text-gray-700">
                ₹{(p.totalRevenue || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* INCLUSIONS PREVIEW */}
          {p.inclusions?.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Key Inclusions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.inclusions.slice(0, 3).map((inc, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gradient-to-r from-teal-50 to-blue-50 text-gray-700 px-2.5 py-1 rounded-full border border-teal-100"
                  >
                    {inc}
                  </span>
                ))}
                {p.inclusions.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{p.inclusions.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* WINNER PREVIEW (COMPLETED) */}
          {isCompleted && winner && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 mb-4 border border-yellow-200">
              <p className="text-xs font-bold text-gray-800 flex items-center mb-1">
                <Crown className="w-4 h-4 mr-1 text-yellow-600" />
                Winner: {winner.name}
              </p>
              <p className="text-xs text-gray-600">
                {winner.city} • Card: {winner.virtualCardNumber}
              </p>
            </div>
          )}

          {/* CURRENT PACKAGE MESSAGE */}
          {p.status === 'current' && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 mb-4 border border-emerald-200">
              <p className="text-xs font-bold text-emerald-800 flex items-center">
                <Gift className="w-4 h-4 mr-1" />
                Live Draw on {format(new Date(p.drawDate), 'MMM dd')}
              </p>
            </div>
          )}

          {/* VIEW DETAILS BUTTON */}
          <Link
            to={`/member/package/details/${p._id}`}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 px-4 rounded-xl font-semibold text-center block transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </Link>
        </div>
      </div>
    );
  };

  // -----------------------------------------------------------------
  // LOADING STATE
  // -----------------------------------------------------------------
  if (loading) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // FILTER PACKAGES
  // -----------------------------------------------------------------
  const upcoming = packages.filter((p) => p.status === 'upcoming');
  const current = packages.filter((p) => p.status === 'current');
  const completed = packages.filter((p) => p.status === 'draw_completed');

  // -----------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------
  return (
    <div className="py-16 md:py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">

        {/* HERO HEADER */}
       

        {/* UPCOMING */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <Clock className="w-8 h-8 mr-3 text-blue-600" />
                Upcoming Packages
              </h2>
              <span className="text-sm text-gray-500">
                {upcoming.length} package{upcoming.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {upcoming.map((p) => (
                <PackageCard key={p._id} p={p} />
              ))}
            </div>
          </section>
        )}

        {/* CURRENT */}
        {current.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <Gift className="w-8 h-8 mr-3 text-green-600" />
                Current Running Package
              </h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Live Now
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {current.map((p) => (
                <PackageCard key={p._id} p={p} />
              ))}
            </div>
          </section>
        )}

        {/* COMPLETED */}
        {completed.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-yellow-600" />
                Past Winners
              </h2>
              <span className="text-sm text-gray-500">
                {completed.length} completed
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {completed.map((p) => (
                <PackageCard key={p._id} p={p} />
              ))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {packages.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No packages available
            </h3>
            <p className="text-gray-500">
              Check back later for exciting lucky draw packages!
            </p>
          </div>
        )}

      
      </div>
    </div>
  );
};

export default Pack;