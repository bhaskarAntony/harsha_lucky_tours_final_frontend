// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'
import {
  Menu, X, Plane, User, LogOut, Home, FileText, MessageCircle,
  ChevronRight, Shield, ChevronDown, Package, Users, CreditCard,
  Bell, Settings,
  VideoIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Close menus on route change
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleClick = () => setIsUserMenuOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isUserMenuOpen]);

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(prev => !prev);
  };

  const publicLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About Us', icon: FileText },
    { to: '/contact', label: 'Contact Us', icon: MessageCircle },
    { to: '/sitemap', label: 'Sitemap', icon: ChevronRight },
    { to: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
  ];

  const userLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: Package },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/lucky-draw', label: 'Lucky Draw', icon: Bell },
    { to: '/live', label: 'Live Draws', icon: VideoIcon },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: Settings },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/packages', label: 'Packages', icon: Package },
    { to: '/admin/payments', label: 'Payments', icon: CreditCard },
    { to: '/admin/pending', label: 'Pending Payments', icon: FileText },
    { to: '/admin/messages', label: 'Messages', icon: MessageCircle },
    { to: '/admin/profile', label: 'Admin Profile', icon: User },
  ];

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">

            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-3">
              {/* <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Harsha Lucky Tours</h1>
                <p className="text-xs text-gray-600">Travel Lucky Draw</p>
              </div> */}
              <img src={logo} alt="harsha lucky tours"  width={120}/>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-8">
              {publicLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`font-medium transition ${
                    isActive(to) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Packages Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600 transition">
                  <span>Packages</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                  <Link
                    to="/member/packages"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded-t-lg"
                  >
                   Lucky Draw Member
                  </Link>
                  <Link
                    to="/non-member/packages"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded-b-lg"
                  >
                    Other Members
                  </Link>
                </div>
              </div>

              {/* USER MENU (DESKTOP) */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border overflow-hidden z-30">
                      <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        {isAdmin ? 'Admin Panel' : 'My Account'}
                      </p>
                      {(isAdmin ? adminLinks : userLinks).map(({ to, label, icon: Icon }) => (
                        <Link
                          key={to}
                          to={to}
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-2.5 text-sm font-medium transition ${
                            isActive(to)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{label}</span>
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ====================== MOBILE DRAWER ====================== */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="p-5 border-b flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setIsDrawerOpen(false)}>
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
                    <Plane className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Harsha Lucky</h2>
                    <p className="text-xs text-gray-600">Travel Lucky Draw</p>
                  </div>
                </Link>
                <button onClick={() => setIsDrawerOpen(false)} className="p-1 text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {publicLinks.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive(to) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                ))}

                <div className="pt-2">
                  <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Packages</p>
                  <Link to="/member/packages" onClick={() => setIsDrawerOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                    Member Packages
                  </Link>
                  <Link to="/non-member/packages" onClick={() => setIsDrawerOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                    Non-Member Packages
                  </Link>
                </div>

                {isAuthenticated && (
                  <div className="pt-4 mt-4 border-t">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {isAdmin ? 'Admin Panel' : 'My Account'}
                    </p>
                    {(isAdmin ? adminLinks : userLinks).map(({ to, label, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                          isActive(to) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t bg-gray-50">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsDrawerOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsDrawerOpen(false)}
                      className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsDrawerOpen(false)}
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;