// src/pages/member/MemberPackages.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import {
  Calendar, Users, MapPin, IndianRupee, Clock, Trophy,
  PlayCircle, Crown, CheckCircle, Gift, Loader2, Eye, Package, Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const MemberPackages = () => {
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
      case 'upcoming': return { label: 'Upcoming', bg: 'bg-blue-500/10', text: 'text-blue-600', icon: Clock, ring: 'ring-blue-200/30' };
      case 'current': return { label: 'Live Now', bg: 'bg-emerald-500/15', text: 'text-emerald-600', icon: Gift, ring: 'ring-emerald-200/40' };
      case 'draw_completed': return { label: 'Completed', bg: 'bg-amber-500/10', text: 'text-amber-600', icon: Trophy, ring: 'ring-amber-200/30' };
      default: return { label: 'Upcoming', bg: 'bg-slate-500/10', text: 'text-slate-600', icon: Clock, ring: 'ring-slate-200/30' };
    }
  };

  const PackageCard = ({ p }) => {
    const status = getStatusConfig(p.status);
    const StatusIcon = status.icon;
    const isCompleted = p.status === 'draw_completed';
    const winner = p.winner;

    return (
      <div className="group relative bg-white/80 backdrop-blur-sm border border-white/40 rounded-3xl p-6 hover:border-blue-300/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full max-w-sm mx-auto">
        {/* Animated gradient ring */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl -z-10 ${status.ring} scale-105`}></div>
        
        {/* Image */}
        <div className="relative mb-6">
          <div className="h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100/60 to-slate-200/40 shadow-lg">
            <img
              src={p.images?.[0] || '/placeholder.jpg'}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          {/* Status Badge */}
          <div className="absolute -top-4 left-5">
            <div className={`px-3.5 py-2 rounded-2xl text-[11px] font-semibold flex items-center gap-1.5 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/40 ${status.bg} ${status.text}`}>
              <StatusIcon className="w-4 h-4 shrink-0" />
              {status.label}
            </div>
          </div>

          {isCompleted && winner && (
            <div className="absolute -top-4 right-5">
              <div className="bg-gradient-to-r from-amber-500/95 to-orange-500/95 backdrop-blur-sm text-white px-3.5 py-2 rounded-2xl text-[11px] font-semibold flex items-center gap-1.5 shadow-2xl border border-white/40">
                <Crown className="w-4 h-4 shrink-0" />
                Winner
              </div>
            </div>
          )}
        </div>

        {/* Prize - Hero Section */}
        {p.prizeDescription && (
          <div className="mb-6 p-4 bg-gradient-to-br from-orange-50/95 via-yellow-50/70 to-orange-50/90 backdrop-blur-sm rounded-2xl border border-orange-200/40 shadow-md relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-bl-full -mr-8 -mt-8 blur-xl"></div>
            <div className="flex items-start gap-3 mb-3 relative z-10">
              <div className="bg-gradient-to-br from-orange-500/20 p-2.5 rounded-xl border-2 border-orange-200/40 shadow-sm shrink-0">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2 mb-2 group-hover:text-orange-700 transition-colors">
                  {p.prizeDescription}
                </p>
                <p className="text-xs text-orange-600 font-medium flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  +25 Surprise Gifts
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] bg-gradient-to-r from-orange-100/90 to-orange-200/70 text-orange-700 px-2.5 py-1 rounded-xl font-semibold border border-orange-200/50 shadow-sm">1 Family</span>
              <span className="text-[10px] bg-gradient-to-r from-yellow-100/90 to-yellow-200/70 text-yellow-700 px-2.5 py-1 rounded-xl font-semibold border border-yellow-200/50 shadow-sm">OR Gold/Silver</span>
            </div>
          </div>
        )}

        {/* Package Name */}
        <h3 className="text-base font-semibold text-slate-900 mb-4 px-1 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {p.name}
        </h3>

        {/* Pricing */}
        <div className="mb-6 p-4 bg-gradient-to-br from-emerald-50/95 to-green-50/80 backdrop-blur-sm rounded-2xl border-2 border-emerald-200/50 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Monthly Plan</span>
            <IndianRupee className="w-5 h-5 text-emerald-600 shrink-0" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              ₹{p.monthlyInstallment?.toLocaleString() || '0'}
            </span>
            <span className="text-sm font-semibold text-emerald-600 uppercase">/month</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
          <div className="flex items-center gap-2 p-3.5 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/40 hover:bg-blue-50/60 transition-colors group/date">
            <Calendar className="w-4.5 h-4.5 text-blue-500 group-hover/date:text-blue-600 shrink-0" />
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-medium">Draw Date</p>
              <p className="font-semibold text-slate-900">
                {format(new Date(p.drawDate), 'MMM dd, yy')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3.5 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/40 hover:bg-orange-50/60 transition-colors group/map">
            <MapPin className="w-4.5 h-4.5 text-orange-500 group-hover/map:text-orange-600 shrink-0" />
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-medium">Destination</p>
              <p className="font-semibold text-slate-900 line-clamp-1">
                {p.destination?.[0] || 'Multiple'}
                {p.destination?.length > 1 && <span className="text-slate-500">+{p.destination.length-1}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Inclusions */}
        {p.inclusions?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4.5 h-4.5 text-emerald-500" />
              <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Includes</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.inclusions.slice(0, 4).map((inc, i) => (
                <span key={i} className="text-[10px] bg-emerald-100/80 text-emerald-700 px-2 py-1.5 rounded-lg font-semibold border border-emerald-200/50 shadow-xs">
                  {inc}
                </span>
              ))}
              {p.inclusions.length > 4 && (
                <span className="text-[10px] text-slate-500 font-medium">+{p.inclusions.length-4}</span>
              )}
            </div>
          </div>
        )}

        {/* Winner Preview */}
        {isCompleted && winner && (
          <div className="mb-6 p-4 bg-gradient-to-br from-amber-50/95 to-orange-50/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500/20 p-2 rounded-xl border border-amber-200/40 shrink-0">
                <Crown className="w-4 h-4 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 line-clamp-1">{winner.name}</p>
                {winner.city && <p className="text-xs text-slate-600 mt-1">{winner.city}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Live Notice */}
        {p.status === 'current' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl border-2 border-emerald-400/50 shadow-lg">
            <div className="flex items-center justify-center gap-2.5">
              <Gift className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Live Draw Active!</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Link
          to={`/member/package/details/${p._id}`}
          className="w-full bg-gradient-to-r from-blue-600/95 to-blue-700/95 hover:from-blue-700/100 hover:to-blue-800/100 backdrop-blur-md text-white text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 font-semibold shadow-xl hover:shadow-2xl border border-white/20 transition-all duration-400 group-hover:scale-[1.05] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-110"></div>
          <Eye className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform duration-500 shrink-0 relative z-10" />
          <span className="relative z-10 tracking-wide uppercase">View Details</span>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-50/70 flex items-center justify-center p-8">
        <div className="text-center space-y-8 max-w-md">
          <div className="w-28 h-28 bg-gradient-to-r from-blue-500/15 to-blue-600/15 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-md border border-blue-200/40 shadow-2xl">
            <Loader2 className="w-14 h-14 text-blue-500 animate-spin" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">Loading Packages</h3>
            <p className="text-lg text-slate-600">Discover amazing lucky draw opportunities</p>
          </div>
        </div>
      </div>
    );
  }

  const upcoming = packages.filter(p => p.status === 'upcoming');
  const current = packages.filter(p => p.status === 'current');
  const completed = packages.filter(p => p.status === 'draw_completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-50/80 overflow-x-hidden">
      {/* Hero Header */}
      <section className="pt-20 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/1 via-transparent to-transparent h-2/3"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-light bg-gradient-to-r from-slate-900 via-blue-900/80 to-slate-900 bg-clip-text text-transparent mb-6 leading-none drop-shadow-2xl">
            Harsha Lucky Draw
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-3xl border border-slate-200/50 shadow-xl text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <IndianRupee className="w-14 h-14 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">₹1000/month</h4>
              <p className="text-sm text-slate-600 font-medium">Easy monthly payments</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-3xl border border-slate-200/50 shadow-xl text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <Gift className="w-14 h-14 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">+25 Gifts</h4>
              <p className="text-sm text-slate-600 font-medium">Other Members</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-3xl border border-slate-200/50 shadow-xl text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <Star className="w-14 h-14 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">Lucky draw Prizes</h4>
              <p className="text-sm text-slate-600 font-medium">Trips or  Gold/Silver</p>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-slate-700 font-medium max-w-4xl mx-auto leading-relaxed px-4">
            Pay monthly • Win dream vacations or gold prizes • 1 winner every month
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 max-w-7xl relative">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/15 to-blue-600/15 rounded-3xl flex items-center justify-center border-2 border-blue-200/50 shadow-lg">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-light text-slate-900 mb-2 tracking-tight">Upcoming Packages</h2>
                <p className="text-lg text-slate-500 font-medium">{upcoming.length} packages available</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map(p => <PackageCard key={p._id} p={p} />)}
            </div>
          </section>
        )}

        {/* Current */}
        {current.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl flex items-center justify-center border-2 border-emerald-200/60 shadow-lg animate-pulse">
                <Gift className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-3xl font-light text-slate-900 mb-2 tracking-tight">Live Package</h2>
                <p className="text-lg text-emerald-600 font-semibold">Draw happening now!</p>
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
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/15 to-orange-500/15 rounded-3xl flex items-center justify-center border-2 border-amber-200/50 shadow-lg">
                <Trophy className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h2 className="text-3xl font-light text-slate-900 mb-2 tracking-tight">Past Winners</h2>
                <p className="text-lg text-slate-500 font-medium">{completed.length} packages completed</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {completed.map(p => <PackageCard key={p._id} p={p} />)}
            </div>
          </section>
        )}

        {/* Empty State */}
        {packages.length === 0 && !loading && (
          <section className="text-center py-32">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-100/80 to-slate-200/60 rounded-3xl flex items-center justify-center mx-auto mb-12 backdrop-blur-sm shadow-2xl border border-slate-200/50">
              <Calendar className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-4xl font-light text-slate-800 mb-6 tracking-tight">No Packages Yet</h3>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Amazing lucky draw packages coming soon. Check back for dream trips and gold prizes!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <IndianRupee className="w-16 h-16 text-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">₹1000/month</h4>
                <p className="text-lg text-slate-600 font-medium">Super affordable luxury</p>
              </div>
              <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <Gift className="w-16 h-16 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">+25 Gifts</h4>
                <p className="text-lg text-slate-600 font-medium">Every single draw</p>
              </div>
              <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">1 Winner/Month</h4>
                <p className="text-lg text-slate-600 font-medium">Dream trips + gold prizes</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MemberPackages;
