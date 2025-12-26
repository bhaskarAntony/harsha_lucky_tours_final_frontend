// src/pages/member/Pack.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import {
  Calendar, MapPin, Clock, Trophy, Crown, Gift, Loader2, Eye, Star, IndianRupee,
  Users, Award, GiftIcon, Star as StarIcon, Package
} from 'lucide-react';
import toast from 'react-hot-toast';

const Pack = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/packages');
        setPackages(data.data.reverse() || []);
      } catch (err) {
        toast.error('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'upcoming': return { label: 'Upcoming', bg: 'bg-blue-50/80', text: 'text-blue-600', icon: Clock, ring: 'ring-blue-200/30' };
      case 'current': return { label: 'Live Now', bg: 'bg-emerald-50/90', text: 'text-emerald-600', icon: Gift, ring: 'ring-emerald-200/40' };
      case 'draw_completed': return { label: 'Completed', bg: 'bg-amber-50/80', text: 'text-amber-600', icon: Trophy, ring: 'ring-amber-200/30' };
      default: return { label: 'Upcoming', bg: 'bg-slate-50/80', text: 'text-slate-600', icon: Clock, ring: 'ring-slate-200/30' };
    }
  };

  const PackageCard = ({ p }) => {
    const status = getStatusConfig(p.status);
    const StatusIcon = status.icon;
    const isCompleted = p.status === 'draw_completed';
    const winner = p.winner;

    return (
      <div className="group relative bg-white border border-white/40 rounded-2xl p-6 hover:border-blue-300/50 hover:shadow-xl hover:-translate-y-1 transition-all shadow-md duration-400 overflow-hidden h-full max-w-sm mx-auto">
        {/* Subtle gradient ring */}
        <div className={`absolute inset-0 rounded-2xl ${status.ring} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 scale-105`}></div>
        
        {/* Image */}
        <div className="relative mb-5">
          <div className="h-44 w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-100/50 to-slate-200/50 border border-white/30 shadow-sm">
            <img
              src={p.images?.[0] || '/placeholder.jpg'}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Status Badge */}
          <div className="absolute -top-3 left-4">
            <div className={`px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-md bg-white/90 backdrop-blur-sm border ${status.bg} ${status.text} border-white/50`}>
              <StatusIcon className="w-3.5 h-3.5 shrink-0" />
              {status.label}
            </div>
          </div>

          {isCompleted && winner && (
            <div className="absolute -top-3 right-4">
              <div className="bg-gradient-to-r from-amber-400/90 to-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-lg border border-white/30">
                <Crown className="w-3.5 h-3.5 shrink-0" />
                Winner
              </div>
            </div>
          )}
        </div>

        {/* Package Name */}
        <h3 className="text-base font-semibold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors px-1">
          {p.name}
        </h3>

        {/* Prize Description - Main Hero Section */}
        {p.prizeDescription && (
          <div className="mb-5 p-4 bg-gradient-to-br from-orange-50/90 via-yellow-50/70 to-orange-50/90 backdrop-blur-sm rounded-xl border border-orange-200/40 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full -mr-12 -mt-12 blur-xl"></div>
            <div className="flex items-start gap-3 mb-3 relative z-10">
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-400/20 p-2 rounded-lg border border-orange-200/40 shadow-sm shrink-0">
                <StarIcon className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2 mb-1.5">
                  {p.prizeDescription}
                </p>
                <p className="text-xs text-orange-600 font-medium flex items-center gap-1.5">
                  <GiftIcon className="w-3.5 h-3.5" />
                  +25 Surprise Gifts
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-gradient-to-r from-orange-100/80 to-orange-200/60 text-orange-700 px-2.5 py-1 rounded-full font-semibold border border-orange-200/50 shadow-sm">1 Family</span>
              <span className="text-[10px] bg-gradient-to-r from-yellow-100/80 to-yellow-200/60 text-yellow-700 px-2.5 py-1 rounded-full font-semibold border border-yellow-200/50 shadow-sm">OR Gold/Silver</span>
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-5 p-4 bg-gradient-to-br from-emerald-50/90 to-green-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/40 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Monthly Plan</span>
            <IndianRupee className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              ₹{p.monthlyInstallment?.toLocaleString() || '0'}
            </span>
            <span className="text-xs font-semibold text-emerald-600 uppercase">/month</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          <div className="group/pin flex items-center gap-2 p-3 bg-slate-50/70 backdrop-blur-sm rounded-lg border border-slate-200/40 hover:bg-blue-50/50 transition-colors">
            <Calendar className="w-4 h-4 text-blue-500 group-hover/pin:text-blue-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-[2px] font-medium">Draw Date</p>
              <p className="font-semibold text-slate-900 line-clamp-1">
                {p.drawDate ? format(new Date(p.drawDate), 'MMM dd, yyyy') : 'TBD'}
              </p>
            </div>
          </div>

          <div className="group/map flex items-center gap-2 p-3 bg-slate-50/70 backdrop-blur-sm rounded-lg border border-slate-200/40 hover:bg-orange-50/50 transition-colors">
            <MapPin className="w-4 h-4 text-orange-500 group-hover/map:text-orange-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-[2px] font-medium">Destination</p>
              <p className="font-semibold text-slate-900 line-clamp-1">
                {p.destination?.[0] || 'Multiple'}
                {p.destination?.length > 1 && <span className="text-slate-500"> +{p.destination.length-1}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Inclusions */}
        {p.inclusions?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Includes</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.inclusions.slice(0, 5).map((inc, i) => (
                <span key={i} className="text-[10px] bg-emerald-100/70 text-emerald-700 px-2 py-1 rounded-lg font-medium border border-emerald-200/50">
                  {inc}
                </span>
              ))}
              {p.inclusions.length > 5 && (
                <span className="text-[10px] text-slate-500 font-medium">+{p.inclusions.length-5}</span>
              )}
            </div>
          </div>
        )}

        {/* Winner Info */}
        {isCompleted && winner && (
          <div className="mb-6 p-3.5 bg-gradient-to-r from-amber-50/90 to-orange-50/80 backdrop-blur-sm rounded-lg border border-amber-200/40 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-400/20 p-1.5 rounded-full border border-amber-200/40">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 line-clamp-1">{winner.name}</p>
                {winner.city && <p className="text-xs text-slate-600 mt-[2px]">{winner.city}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Live Status */}
        {p.status === 'current' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/8 to-green-500/8 backdrop-blur-sm rounded-xl border-2 border-emerald-300/50 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent w-1/2 blur-sm -skew-x-12"></div>
            <div className="relative z-10 flex items-center justify-center gap-2.5">
              <Gift className="w-5 h-5 text-emerald-600 animate-pulse shrink-0" />
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Live Draw Active</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Link
          to={`/member/package/details/${p._id}`}
          className="w-full bg-gradient-to-r from-blue-600/95 to-blue-700/95 hover:from-blue-700/100 hover:to-blue-800/100 backdrop-blur-md text-white text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl border border-white/20 transition-all duration-400 group-hover:scale-[1.03] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <Eye className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
          <span className="relative z-10 tracking-wide">View Details</span>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white/80 to-slate-50 flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-blue-200/40 shadow-xl">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2 tracking-tight">Loading Packages</h3>
            <p className="text-sm text-slate-600">Discover amazing lucky draw packages</p>
          </div>
        </div>
      </div>
    );
  }

  const upcoming = packages.filter(p => p.status === 'upcoming');
  const current = packages.filter(p => p.status === 'current');
  const completed = packages.filter(p => p.status === 'draw_completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/90 via-white to-slate-50/80">
      {/* Header */}
      <section className="pt-16 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/2 to-transparent h-1/2"></div>
        <div className="relative max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-6 leading-none drop-shadow-2xl">
            Harsha Lucky Draw
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200/50 shadow-lg text-sm font-semibold text-slate-700 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-500" />
              ₹1000 / month
            </div>
            <div className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200/50 shadow-lg text-sm font-semibold text-slate-700 flex items-center gap-2">
              <GiftIcon className="w-5 h-5 text-orange-500" />
              +25 Gifts / Draw
            </div>
          </div>
          <p className="text-xl md:text-2xl text-slate-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Dream Trips • Gold & Silver Prizes • Every Month New Adventure
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16 max-w-7xl">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl flex items-center justify-center border-2 border-blue-200/40 shadow-md">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-1 tracking-tight">Upcoming Packages</h2>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{upcoming.length} Package{upcoming.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map(p => <PackageCard key={p._id} p={p} />)}
            </div>
          </section>
        )}

        {/* Current */}
        {current.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/15 to-green-500/15 rounded-2xl flex items-center justify-center border-2 border-emerald-200/50 shadow-md animate-pulse">
                <Gift className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-1 tracking-tight">Live Package</h2>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">Draw Active Now</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {current.map(p => <PackageCard key={p._id} p={p} />)}
            </div>
          </section>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center border-2 border-amber-200/40 shadow-md">
                <Trophy className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-1 tracking-tight">Past Winners</h2>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{completed.length} Completed</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {completed.map(p => <PackageCard key={p._id} p={p} />)}
            </div>
          </section>
        )}

        {packages.length === 0 && !loading && (
          <section className="text-center py-32">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-100/80 to-slate-200/60 rounded-3xl flex items-center justify-center mx-auto mb-12 backdrop-blur-sm shadow-2xl border border-slate-200/50">
              <Calendar className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-3xl font-light text-slate-800 mb-4 tracking-tight">Packages Coming Soon</h3>
            <p className="text-xl text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
              Amazing lucky draw packages with dream trips and gold prizes will appear here
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <IndianRupee className="w-12 h-12 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">₹1000/month</h4>
                <p className="text-sm text-slate-600">Affordable luxury</p>
              </div>
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <GiftIcon className="w-12 h-12 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">+25 Gifts</h4>
                <p className="text-sm text-slate-600">Every draw</p>
              </div>
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <StarIcon className="w-12 h-12 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Dream Prizes</h4>
                <p className="text-sm text-slate-600">Trips + Gold/Silver</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Pack;
