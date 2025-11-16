import React from 'react';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import { ArrowRight, Gift, Users, Clock, Star, Shield, MapPin, Phone } from 'lucide-react';
import { memberPackages } from '../../data/packages';
import { nonMemberPackages } from '../../data/nonMembers';
import Pack from './Pack';

const Home = () => {
  const featuredMemberPackages = memberPackages.slice(0, 3);
  const featuredNonMemberPackages = nonMemberPackages.slice(0, 3);

  return (
    <>
      {/* <Helmet>
        <title>Harsha Lucky Tours | Bangalore Travel Lucky Draw | Karnataka Tours</title>
        <meta name="description" content="Join Harsha Lucky Tours for exciting travel lucky draws! Pay monthly installments and win amazing travel packages across India and abroad. Based in Bangalore, Karnataka." />
        <meta name="keywords" content="Bangalore travel lucky draw, Karnataka tours, Harsha Lucky Tours, travel packages, lucky draw tours, monthly installment travel, Bangalore tours" />
      </Helmet> */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
            alt="Travel destination" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Travel Lucky Draw
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Dreams Come True
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Pay monthly installments, enter lucky draws, and win incredible travel experiences across India and abroad!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/packages/member" 
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Explore Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-white hover:bg-white hover:text-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How Lucky Draw Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How Our Lucky Draw Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to your dream vacation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1. Register</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your preferred travel package and register as a member. Fill out the simple registration form with your details.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-12 w-12 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2. Pay Monthly</h3>
              <p className="text-gray-600 leading-relaxed">
                Pay affordable monthly installments instead of the full amount upfront. Every payment gets you one entry into the monthly draw.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">3. Win & Travel</h3>
              <p className="text-gray-600 leading-relaxed">
                Lucky winners are selected every month through a transparent draw process. Winners enjoy their dream vacation completely free!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                About Harsha Lucky Tours
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Welcome to Harsha Lucky Tours, where dreams take flight! ✈️
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a unique draw-based travel company that gives lucky winners the chance to explore exciting destinations. 
                With just a simple entry, you could be the next traveler to pack your bags and fly to your dream location.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our mission is to make travel fun, thrilling, and full of surprises. 
                Safe, reliable, and exciting – we make travel dreams come true.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Read More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">500+ Members</h3>
                <p className="text-gray-600 text-sm">Happy travelers joined our lucky draw community</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">50+ Destinations</h3>
                <p className="text-gray-600 text-sm">Amazing places across India and international</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">100+ Winners</h3>
                <p className="text-gray-600 text-sm">Lucky members won their dream vacations</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">4.8/5 Rating</h3>
                <p className="text-gray-600 text-sm">Excellent customer satisfaction reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured Travel Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing destinations through our lucky draw system
            </p>
          </div>

          {/* Member Packages */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800">Member Packages</h3>
              <Link 
                to="/member/packages" 
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
         <Pack/>
          </div>

          {/* Non-Member Packages */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800">Non-Member Packages</h3>
              <Link 
                to="/packages/non-member" 
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNonMemberPackages.map((pkg) => (
                <div key={pkg.packageId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.images[0]} 
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {/* <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    </div> */}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h4>
                    <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{pkg.duration}</span>
                      <span className="text-sm font-semibold text-green-600">Available Now</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.inclusions.slice(0, 3).map((inclusion, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                          {inclusion}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Harsha Lucky Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make dream vacations accessible and exciting for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Transparent Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Our lucky draw process is completely transparent with live draws and verified results. No hidden charges or conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Affordable Monthly Plans</h3>
              <p className="text-gray-600 leading-relaxed">
                Pay in small monthly installments instead of huge upfront costs. Make your dream vacation financially manageable.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Packages</h3>
              <p className="text-gray-600 leading-relaxed">
                Carefully curated travel packages with premium accommodations, guided tours, and all major inclusions covered.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated customer support team to assist you throughout your journey from registration to your travel experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Multiple Destinations</h3>
              <p className="text-gray-600 leading-relaxed">
                Wide variety of destinations across India and international locations to suit every traveler's preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Surprise & Excitement</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience the thrill of winning and the joy of unexpected travel adventures. Every month brings new possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of happy travelers who have made their dream vacations come true through our lucky draw system. 
            Your next adventure is just one registration away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us Now
            </Link>
            <Link 
              to="/packages/member" 
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;