import React from 'react';
// import { Helmet } from 'react-helmet-async';
import { 
  Plane, Target, Shield, Heart, Sparkles, CheckCircle, 
  MapPin, Clock, Users, Star, ArrowRight, Building2, Globe
} from 'lucide-react';

const About = () => {
  return (
    <>
      {/* <Helmet>
        <title>About Us | Harsha Lucky Tours | Bangalore's New Travel Lucky Draw Startup</title>
        <meta name="description" content="Harsha Lucky Tours is a Bangalore-based startup revolutionizing travel with affordable lucky draws. Pay monthly, win dream vacations!" />
        <meta name="keywords" content="harsha lucky tours, bangalore startup, travel lucky draw, win vacation, affordable travel india" />
      </Helmet> */}

      {/* SMALL HERO BANNER */}
      <section className="relative h-64 md:h-72 bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 text-white overflow-hidden">
         <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 flex column content-center"
          style={{ backgroundImage: 'url("https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg")' }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Harsha Lucky Tours
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Bangalore's New Way to Win Dream Vacations
          </p>
        </div>
      </section>

      {/* STARTUP STORY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
              Born in Bangalore, Built for Dreamers
            </h2>
            <div className="prose prose-lg text-gray-600 mx-auto space-y-6">
              <p>
                We started <strong>Harsha Lucky Tours</strong> in 2024 with a simple idea: 
                <span className="text-blue-600 font-semibold"> “Why should only the rich travel?”</span>
              </p>
              <p>
                As a <strong>100% Bangalore-born startup</strong>, we saw families dreaming of vacations but held back by cost. 
                So we created a new model — <strong>pay small monthly installments</strong>, and <strong>one lucky couple wins a fully paid trip every month</strong>.
              </p>
              <p>
                No loans. No debt. Just hope, transparency, and a fair chance to fly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            How Our Lucky Draw Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Join as Member', desc: 'Pay ₹999–₹2,999/month based on package', icon: Users },
              { step: '02', title: 'Live Monthly Draw', desc: 'Watch live on YouTube & Instagram', icon: Globe },
              { step: '03', title: 'Win & Fly!', desc: 'Fully paid trip for 2 — flights, stay, meals', icon: Plane },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="text-5xl font-bold text-blue-600 mb-4">{item.step}</div>
                    <div className="bg-gradient-to-r from-blue-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY WE'RE DIFFERENT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Why Choose Harsha Lucky Tours?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { title: '100% Transparent', desc: 'Live draw streamed on social media. No black box.', icon: CheckCircle },
              { title: 'No Hidden Costs', desc: 'Winners pay nothing extra. Everything included.', icon: Shield },
              { title: 'Premium Partners', desc: '5-star hotels, trusted airlines, verified vendors.', icon: Star },
              { title: 'Bangalore Local', desc: 'Born here. We understand Indian families.', icon: Building2 },
              { title: 'Flexible Plans', desc: 'Start with just ₹999/month. Cancel anytime.', icon: Clock },
              { title: 'Real Winners', desc: 'Every month, one couple flies. Verified & celebrated.', icon: Heart },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-all">
                  <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-3 rounded-full flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Dream Packages You Can Win
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { dest: 'Goa Getaway', price: '₹999/month', nights: '3N/4D', img: 'https://images.pexels.com/photos/3581363/pexels-photo-3581363.jpeg' },
              { dest: 'Kerala Backwaters', price: '₹1,499/month', nights: '4N/5D', img: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg' },
              { dest: 'Maldives Escape', price: '₹2,999/month', nights: '5N/6D', img: 'https://images.pexels.com/photos/3581365/pexels-photo-3581365.jpeg' },
            ].map((pkg, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img src={pkg.img} alt={pkg.dest} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.dest}</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-1">{pkg.price}</p>
                  <p className="text-sm text-gray-500 mb-4">{pkg.nights} • Couple Package</p>
                  <a href="/packages/member" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VISION & MISSION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 rounded-3xl shadow-xl">
              <Target className="h-12 w-12 mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg leading-relaxed">
                To make <strong>premium travel accessible</strong> to every Indian family through an innovative, 
                transparent, and exciting lucky draw system.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white p-10 rounded-3xl shadow-xl">
              <Sparkles className="h-12 w-12 mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To become <strong>India’s most loved travel startup</strong> — where every member feels 
                part of a community chasing dreams together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GROWTH STATS (Startup Style) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Growing Fast in Bangalore & Beyond
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            {[
              { num: '150+', label: 'Members in 6 Months' },
              { num: '3', label: 'Winners Already' },
              { num: '12', label: 'Destinations Ready' },
              { num: '4.8', label: 'Member Happiness Score' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.num}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be Part of Bangalore's Travel Revolution
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join our growing family. Pay monthly. Win big. Travel free.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/packages/member" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-10 py-5 rounded-full font-bold text-xl transition-all transform hover:scale-105 inline-flex items-center justify-center">
              View Packages <ArrowRight className="ml-3 h-6 w-6" />
            </a>
            <a href="/contact" className="border-2 border-white hover:bg-white hover:text-blue-900 px-10 py-5 rounded-full font-bold text-xl transition-all">
              Talk to Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;