// src/pages/About.jsx
import React from 'react';
import { 
  Plane, Target, Shield, Heart, Sparkles, CheckCircle, 
  MapPin, Clock, Users, Star, ArrowRight, Building2, Globe,
  Package, Gift, Crown, Calendar, Trophy, Phone, Mail, Map,
  Award, TrendingUp, Users as UsersIcon, Verified,
  Hotel,IndianRupee
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { giftCatalogue } from '../../data/gifts';
import { nonMemberPackages } from '../../data/nonMembers';
import Pack from './Pack';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-50/80">
      
      {/* Hero Banner */}
      <section className="relative  overflow-hidden py-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
           
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 drop-shadow-2xl tracking-tight">
              Harsha Lucky Draw Tours
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium max-w-3xl mx-auto opacity-95 leading-relaxed mb-8">
              Pay ₹1000/month • Win Dream Trips or Gold/Silver • Trips or 25 Surprise Gifts Other Members
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
              <a href="/member/packages" className="group bg-white/90 backdrop-blur-sm text-slate-900 px-8 py-4 rounded-3xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-white/40 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 flex items-center gap-3 justify-center">
                <span>View Packages</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div> */}
          </div>
        </div>
      </section>

      {/* Core Value Proposition */}
      <section className="py-24 md:py-32 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-blue-100 px-4 py-2 rounded-2xl text-sm font-semibold text-emerald-700 border border-emerald-200/50">
                <Gift className="w-4 h-4" />
                <span>Every month Lucky Draw with Amazing Trips</span>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
                  Dream Trips for ₹1000/month
                </h2>
                <p className="text-xl md:text-2xl font-medium">
                  Every family deserves a vacation. Every month, <span className="text-orange-600 font-semibold">1 family wins</span> a fully paid trip.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
                  {[
                    { icon: Plane, label: 'Flights' },
                    { icon: MapPin, label: 'All Meals' },
                    { icon: MapPin, label: 'Transportation' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50/70 px-4 py-2.5 rounded-xl border border-slate-200/50 hover:bg-blue-50/60 transition-colors">
                      <item.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <div className="bg-gradient-to-br from-blue-500/8 to-emerald-500/8 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-blue-200/30 overflow-hidden">
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Family vacation" 
                    className="w-full h-80 lg:h-[450px] object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-slate-50/80 via-blue-50/40 to-emerald-50/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
              3 Steps to Your Dream Trip
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto">
              Simple. Fair. Exciting.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { 
                step: '01', 
                title: 'Choose Package', 
                desc: 'Select from dream destinations. Pay ₹1000/month', 
                icon: Package,
                color: 'from-blue-500',
                stats: '12+ Destinations'
              },
              { 
                step: '02', 
                title: 'Live Lucky Draw', 
                desc: 'Watch live YouTube draw. Every participant equal chance', 
                icon: Trophy,
                color: 'from-emerald-500',
                stats: '100% Transparent'
              },
              { 
                step: '03', 
                title: 'Win & Travel Free', 
                desc: '1 family wins fully paid trip. +25 surprise gifts for others', 
                icon: Plane,
                color: 'from-orange-500',
                stats: '1 Winner/Month'
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group relative text-center">
                  <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-slate-200/40 hover:border-[${item.color}]/20 transition-all duration-700 h-full flex flex-col items-center ${i !== 1 ? 'hover:-translate-y-4' : ''}`}>
                    <div className={`w-24 h-24 bg-gradient-to-br ${item.color} to-slate-100 rounded-3xl flex items-center justify-center border-2 border-white/30 mb-8 shadow-xl group-hover:scale-110 transition-all duration-700 mx-auto`}>
                      <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-6 tracking-tight opacity-90 group-hover:text-[hsl(var(--${item.color.replace('from-', ''})/1)] transition-colors">{item.step}</div>
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6 leading-tight group-hover:text-slate-800">{item.title}</h3>
                    <p className="text-base text-slate-600 font-medium mb-8 leading-relaxed max-w-sm mx-auto">{item.desc}</p>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider opacity-80">{item.stats}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

         <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
         <div className="text-center mb-20">
    <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full mb-6 mx-auto max-w-max">
      <span className="text-sm mr-2">🎯</span>
      <span className="font-medium">Dream Scheme by Harsha Lucky Tours</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-normal text-gray-800 mb-4 leading-tight">
      Win Dream Vacations or Premium Gifts
    </h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Just ₹1000/month unlocks luxury tours for your family OR valuable home gifts. 
      Every member wins - either through lucky draw or our guaranteed reward system!
    </p>
  </div>

  {/* MEMBER PACKAGES */}
  <div className="mb-20">
   
    <Pack/>
  </div>

          {/* Non-Member Packages */}
        <div>
         <div className="max-w-6xl mx-auto px-4 py-12">
  {/* Header */}
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
      Guaranteed Rewards for Loyal Members
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Complete your Dream Scheme without winning? Choose any premium tour OR home gift.
    </p>
  </div>

  {/* Tour Packages */}
  <section className="mb-16">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-medium text-gray-900">Premium Tour Options</h3>
      <Link to="/tours" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
        View All <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nonMemberPackages.map((pkg) => (
        <div key={pkg.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
          <div className="h-48 w-full rounded-xl overflow-hidden mb-6">
            <img 
              src={pkg.images[0]} 
              alt={pkg.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h4 className="text-xl font-medium text-gray-900 mb-3 line-clamp-2">{pkg.name}</h4>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
          
          <div className="space-y-3 mb-6">
            {/* <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {pkg.duration}
            </div> */}
            <div className="flex flex-wrap gap-2">
              {pkg.inclusions.slice(0,3).map((item, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          {/* <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-sm font-medium py-3 px-4 rounded-xl transition-all duration-300">
            Select Tour
          </button> */}
        </div>
      ))}
    </div>
  </section>

  {/* Gift Catalogue */}
  <section>
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-medium text-gray-900">Premium Home Gifts</h3>
      <span className="text-sm text-gray-500">12 options - doorstep delivery</span>
    </div>
    
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {giftCatalogue.map((gift) => (
        <div key={gift.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
          <div className="h-32 w-full rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
            <img 
              src={gift.image} 
              alt={gift.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h5 className="font-medium text-sm text-gray-900 mb-2 line-clamp-1">{gift.name}</h5>
          <p className="text-xs text-gray-600 mb-4 line-clamp-1">{gift.benefit}</p>
          {/* <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-300">
            Choose Gift
          </button> */}
        </div>
      ))}
    </div>
  </section>

</div>




</div>

        </div>
      </section>

   
      {/* Trust Signals */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-slate-50/70 via-white/80 to-emerald-50/40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
              Why Families Trust Us
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto">
              Bangalore's #1 Lucky Draw Travel Platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                title: 'Live YouTube Draws', 
                desc: 'Every draw streamed live. No secrets.', 
                icon: Globe,
                stats: '50K+ Views'
              },
              { 
                title: 'Verified Winners', 
                desc: 'Real families. Real trips. Photo proof.', 
                icon: Verified,
                stats: '100% Success'
              },
              { 
                title: '5-Star Partners', 
                desc: 'Trusted hotels, airlines, tour operators.', 
                icon: Star,
                stats: '50+ Partners'
              },
              { 
                title: 'Monthly Payouts', 
                desc: 'Guaranteed 26 winners every draw.', 
                icon: TrendingUp,
                stats: '₹25L+/Month'
              },
              { 
                title: 'Easy Payments', 
                desc: 'UPI, Cards, Wallets. Auto-debit option.', 
                icon: IndianRupee,
                stats: '99.9% Success'
              },
              { 
                title: '24/7 Support', 
                desc: 'Bangalore team. Phone, WhatsApp, Email.', 
                icon: Phone,
                stats: '<2hr Response'
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group p-8 rounded-3xl border border-slate-200/50 bg-white/70 backdrop-blur-sm hover:border-blue-200/70 transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 rounded-2xl flex items-center justify-center border-2 border-blue-200/40 flex-shrink-0 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-semibold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                      {/* <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider opacity-90">{item.stats}</div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

     

   

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-blue-600/95 via-blue-700/90 to-emerald-600/95 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/10 -skew-x-12"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-3xl mb-12 border border-white/40 max-w-max mx-auto">
            <Phone className="w-5 h-5" />
            <span className="text-lg font-semibold">Join 350+ Bangalore Families</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-tight">
            Your Dream Trip is One Draw Away
          </h2>
          <p className="text-2xl md:text-3xl mb-16 max-w-4xl mx-auto opacity-95 leading-relaxed">
            Pay ₹1000/month • Fair chance to win • Real trips every month
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-3xl mx-auto">
            <Link 
              to="/member/packages"
              className="group bg-white/95 backdrop-blur-sm text-slate-900 px-12 py-6 lg:px-16 lg:py-7 rounded-3xl font-semibold text-xl lg:text-2xl shadow-2xl hover:shadow-3xl border border-white/40 transition-all duration-700 hover:scale-[1.05] hover:-translate-y-2 flex items-center gap-4 justify-center w-full lg:w-auto"
            >
              <span>Start Winning Today</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-700" />
            </Link>
            <Link 
              to="/contact"
              className="px-12 py-6 lg:px-16 lg:py-7 rounded-3xl font-semibold text-xl lg:text-2xl border-2 border-white/70 hover:bg-white/30 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] w-full lg:w-auto"
            >
              Contact Support
            </Link>
          </div>
          
          <div className="mt-20 pt-16 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-8 text-sm text-white/80">
              <div>
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Bangalore, India
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@harshaluckytours.com
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 80-XXXX-XXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
