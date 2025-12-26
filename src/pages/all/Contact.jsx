// src/pages/Contact.jsx
import React from 'react';
import { 
  Phone, Mail, MapPin, Clock, Building2, Globe, 
  Calendar, Users, Map, Award, Verified, ArrowRight, 
  Package
} from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50/95 via-white/90 to-emerald-50/70">
      
      {/* Hero Banner */}
      <section className="relative py-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-800/50 to-slate-900/60" />
        
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-3xl mb-8 border border-white/30 text-sm font-semibold tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Bangalore Headquarters</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 drop-shadow-2xl tracking-tight">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium max-w-2xl mx-auto opacity-95 leading-relaxed">
              We're here to help you win your dream trip
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24 pt-20 max-w-6xl">
        
        {/* Main Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-24">
          
          {/* Phone & Phone */}
          <div className="lg:col-span-1 group">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-200/50 hover:border-blue-200/70 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center border-2 border-blue-200/40 group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 leading-tight">Call Anytime</h3>
                  <p className="text-sm text-emerald-600 font-bold">24/7 Support</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50/70 to-slate-50/50 rounded-2xl border border-blue-200/40 hover:bg-blue-50/80 transition-all group-hover/parent:translate-x-2">
                  <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Phone</p>
                    <a href="https://wa.me/919019997133" className="text-xs text-blue-600 font-semibold hover:text-blue-700 block">+91 90199 97133</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50/70 to-slate-50/50 rounded-2xl border border-emerald-200/40 hover:bg-emerald-50/80 transition-all group-hover/parent:translate-x-2">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Direct Call</p>
                    <a href="tel:+919611581384" className="text-xs text-blue-600 font-semibold hover:text-blue-700 block">+91 96115 81384</a>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-slate-500 space-y-1">
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Response: &lt;2 minutes</span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>Peak hours: 9AM-9PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="lg:col-span-1 group">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-200/50 hover:border-emerald-200/70 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center border-2 border-emerald-200/40 group-hover:scale-110 transition-all duration-500">
                  <Mail className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 leading-tight">Email Support</h3>
                  <p className="text-sm text-blue-600 font-bold">Inbox Zero Policy</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50/70 to-blue-50/50 rounded-2xl border border-emerald-200/40 hover:bg-emerald-50/80 transition-all group-hover/parent:translate-x-2">
                  <Globe className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Primary</p>
                    <a href="mailto:Harshaluckytours4565@gmail.com" className="text-xs text-blue-600 font-semibold hover:text-blue-700 block truncate">Harshaluckytours4565@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50/70 to-slate-50/50 rounded-2xl border border-blue-200/40 hover:bg-blue-50/80 transition-all group-hover/parent:translate-x-2">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Founder</p>
                    <a href="mailto:Harshabalu321@gmail.com" className="text-xs text-blue-600 font-semibold hover:text-blue-700 block truncate">Harshabalu321@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-slate-500 space-y-1">
                <p>Response within 4 hours</p>
                <p>Business days only</p>
              </div>
            </div>
          </div>

          {/* Address & Hours */}
          <div className="lg:col-span-1 group">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-200/50 hover:border-orange-200/70 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl flex items-center justify-center border-2 border-orange-200/40 group-hover:scale-110 transition-all duration-500">
                  <MapPin className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 leading-tight">Visit Us</h3>
                  <p className="text-sm text-orange-600 font-bold">Bangalore HQ</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="text-sm text-slate-700 leading-relaxed mb-6 p-4 bg-gradient-to-r from-orange-50/70 to-slate-50/50 rounded-2xl border border-orange-200/40">
                  Nārnaund, Haryana<br />
                  <span className="text-xs text-slate-500">India Operations</span>
                </div>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-slate-200/50">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Mon-Fri
                  </span>
                  <span className="font-semibold text-slate-900">9AM-7PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200/50">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Sat-Sun
                  </span>
                  <span className="font-semibold text-slate-900">10AM-5PM</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    24/7 Travel Support
                  </span>
                  <Verified className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-24">
          <a href="https://wa.me/919019997133" className="group md:col-span-1">
            <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 border border-emerald-200/40 hover:border-emerald-300/70 transition-all duration-500 hover:-translate-y-3 text-center h-full">
              <Phone className="w-16 h-16 mx-auto mb-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Phone Chat</h4>
              <p className="text-sm text-slate-600 mb-4">Fastest response</p>
              <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Start Chat →</div>
            </div>
          </a>
          
          <a href="tel:+919019997133" className="group md:col-span-1">
            <div className="bg-gradient-to-br from-blue-500/10 via-slate-500/5 to-emerald-500/10 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/40 hover:border-blue-300/70 transition-all duration-500 hover:-translate-y-3 text-center h-full">
              <Phone className="w-16 h-16 mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Direct Call</h4>
              <p className="text-sm text-slate-600 mb-4">24/7 available</p>
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">Call Now →</div>
            </div>
          </a>
          
          <a href="/member/packages" className="group md:col-span-1">
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-3xl p-8 border border-orange-200/40 hover:border-orange-300/70 transition-all duration-500 hover:-translate-y-3 text-center h-full">
              <Package className="w-16 h-16 mx-auto mb-6 text-orange-600 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">View Packages</h4>
              <p className="text-sm text-slate-600 mb-4">₹1000/month plans</p>
              <div className="text-xs text-orange-600 font-bold uppercase tracking-wider">Explore →</div>
            </div>
          </a>
          
          <a href="/member/register" className="group md:col-span-1">
            <div className="bg-gradient-to-br from-slate-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/40 hover:border-blue-200/70 transition-all duration-500 hover:-translate-y-3 text-center h-full">
              <Users className="w-16 h-16 mx-auto mb-6 text-slate-800 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">Join Members</h4>
              <p className="text-sm text-slate-600 mb-4">350+ families</p>
              <div className="text-xs text-slate-700 font-bold uppercase tracking-wider">Join Now →</div>
            </div>
          </a>
        </div>

        {/* Trust Footer */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-slate-200/50 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-blue-100 px-6 py-3 rounded-2xl text-sm font-semibold text-emerald-700 mb-12 border border-emerald-200/50">
              <Verified className="w-4 h-4" />
              <span>Trusted by 350+ Bangalore Families</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-8 tracking-tight">
              Ready to Start Winning?
            </h3>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Contact us today. Your dream vacation is one call away.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              <a 
                href="https://wa.me/919019997133" 
                className="group bg-gradient-to-r from-emerald-500/90 to-blue-500/90 backdrop-blur-sm text-white px-12 py-5 rounded-3xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-white/30 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 flex items-center gap-3 justify-center"
              >
                <Phone className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Start Phone
              </a>
              <a 
                href="tel:+919019997133"
                className="px-12 py-5 rounded-3xl font-semibold text-lg border-2 border-slate-200/50 hover:bg-slate-50 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] flex items-center gap-3 text-slate-800 justify-center"
              >
                Call +91 90199 97133
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-slate-200/50 mt-12 text-xs text-slate-500">
              {/* <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                Nārnaund, Haryana
              </div> */}
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Harshaluckytours4565@gmail.com
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                +91 90199 97133
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
