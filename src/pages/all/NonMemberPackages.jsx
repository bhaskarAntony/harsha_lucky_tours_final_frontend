import React from 'react';
// import { Helmet } from 'react-helmet-async';
import { Calendar, Users, MapPin, IndianRupee, CheckCircle } from 'lucide-react';
import { nonMemberPackages } from '../../data/nonMembers';

const NonMemberPackages = () => {
  return (
    <>
      {/* <Helmet>
        <title>Non-Member Packages | Harsha Lucky Tours | Direct Booking Travel Packages</title>
        <meta name="description" content="Book directly without membership! Explore our non-member travel packages with fixed pricing. Destinations across India and international locations." />
        <meta name="keywords" content="non-member packages, direct booking tours, fixed price travel, Bangalore tour packages, international tours" />
      </Helmet> */}

      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Non-Member Travel Packages
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Prefer direct booking? Choose from our carefully curated non-member packages with transparent pricing. 
              Book instantly and travel on your preferred dates without waiting for lucky draws!
            </p>
            <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Instant Booking</h3>
              </div>
              <p className="text-gray-700">
                <strong>Book immediately!</strong> Pay the package amount and travel on your preferred dates. 
                No waiting, no luck required - just pure travel excitement!
              </p>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nonMemberPackages.map((pkg) => (
              <div key={pkg.packageId} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pkg.images[0]} 
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {/* <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {pkg.price.toLocaleString()}
                    </span>
                  </div> */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Available Now
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {pkg.destination.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{pkg.description}</p>

                  {/* Package Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="font-medium">Duration</span>
                      </div>
                      <span className="font-semibold text-gray-800">{pkg.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-2" />
                        <span className="font-medium">For Couples</span>
                      </div>
                      <span className="font-semibold text-gray-800">{pkg.couples} People</span>
                    </div>

                    {/* <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <IndianRupee className="h-5 w-5 mr-2" />
                        <span className="font-medium">Package Price</span>
                      </div>
                      <span className="font-bold text-green-600 text-xl">₹{pkg.price.toLocaleString()}</span>
                    </div> */}
                  </div>

                  {/* Inclusions */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Package Inclusions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.inclusions.map((inclusion, index) => (
                        <span 
                          key={index} 
                          className="bg-gradient-to-r from-green-50 to-blue-50 text-gray-700 px-3 py-1 rounded-full text-sm border border-green-100"
                        >
                          {inclusion}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-800 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Instant Booking
                      </span>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Book now and choose your preferred travel dates
                    </p>
                  </div>

                  {/* Book Now Button */}
                  <div className="mt-6">
                    <a
                      href="/contact"
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-center block transition-all duration-300 transform hover:scale-105"
                    >
                      Book This Package
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Information */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose Non-Member Packages?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Guaranteed Travel</h4>
                  <p className="text-gray-600 text-sm">No waiting for draws - book and travel on your schedule</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Flexible Dates</h4>
                  <p className="text-gray-600 text-sm">Choose your preferred travel dates and customize itinerary</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IndianRupee className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Transparent Pricing</h4>
                  <p className="text-gray-600 text-sm">Clear pricing with all inclusions mentioned upfront</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NonMemberPackages;