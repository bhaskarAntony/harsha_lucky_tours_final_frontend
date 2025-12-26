// src/pages/Register.jsx - PERFECT RESPONSIVE LAYOUT
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    address: '',
    dateOfBirth: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* MOBILE LAYOUT */}
      <div className="max-w-md mx-auto px-4 py-8 sm:hidden w-full">
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 bg-[#005aa9] rounded-2xl flex items-center justify-center mx-auto">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Create Account</h2>
            <p className="text-xs text-slate-600">Join our community</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField 
              label="Full Name" 
              icon={User}
              name="name" 
              type="text" 
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <InputField 
              label="Email" 
              icon={Mail}
              name="email" 
              type="email" 
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <InputField 
              label="Phone" 
              icon={Phone}
              name="phone" 
              type="tel" 
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            
            <InputField 
              label="City" 
              icon={MapPin}
              name="city" 
              type="text" 
              placeholder="Your city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block">Address (Optional)</label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                className="w-full h-20 p-3.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005aa9]/30 focus:border-[#005aa9] transition-all resize-none bg-slate-50/50 placeholder-slate-400"
                placeholder="Enter your complete address"
              />
            </div>

            <InputField 
              label="Date of Birth (Optional)"
              icon={Calendar}
              name="dateOfBirth" 
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              required
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              showPassword={showConfirmPassword}
              togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#005aa9] hover:bg-[#004494] disabled:bg-slate-400 text-white text-sm font-medium rounded-xl border border-[#005aa9] disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center justify-center group"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#005aa9] hover:text-[#004494]">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 h-screen lg:h-auto items-stretch">
        
        {/* Left Side - Visual */}
        <div className="lg:flex lg:items-center lg:justify-center bg-gradient-to-br from-[#005aa9] to-[#009688] text-white lg:min-h-screen p-8 lg:p-12">
          <div className="text-center lg:text-left max-w-lg mx-auto lg:mx-0">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 lg:mb-8">
              <User className="w-10 h-10" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
              Welcome to<br />
              <span className="text-white/90">Your Journey</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 mb-8 lg:mb-12 leading-relaxed">
              Create your account and start exploring amazing experiences with us
            </p>
            <div className="space-y-2 text-sm lg:text-base">
              <div className="flex items-center gap-3 opacity-90">
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>Secure & Fast Registration</span>
              </div>
              <div className="flex items-center gap-3 opacity-90">
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>24/7 Customer Support</span>
              </div>
              <div className="flex items-center gap-3 opacity-90">
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>Verified Partners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 lg:p-12 bg-white/80 backdrop-blur-sm">
          <div className="w-full max-w-lg space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900">Create Account</h2>
              <p className="text-sm lg:text-base text-slate-600">Join our community in 2 minutes</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 shadow-xl">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="Full Name" 
                    icon={User}
                    name="name" 
                    type="text" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <InputField 
                    label="Email" 
                    icon={Mail}
                    name="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="Phone" 
                    icon={Phone}
                    name="phone" 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  
                  <InputField 
                    label="City" 
                    icon={MapPin}
                    name="city" 
                    type="text" 
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 block">Address (Optional)</label>
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full h-20 p-4 text-sm border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#005aa9]/30 focus:border-[#005aa9] transition-all resize-none bg-slate-50/50 placeholder-slate-400"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="Date of Birth (Optional)"
                    icon={Calendar}
                    name="dateOfBirth" 
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  
                  <div /> {/* Spacer */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PasswordField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                    required
                  />
                  
                  <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    showPassword={showConfirmPassword}
                    togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-[#005aa9] hover:bg-[#004494] disabled:bg-slate-400 text-white text-base font-semibold rounded-2xl border-2 border-[#005aa9] disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-3" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5 mr-2 opacity-90 group-hover:scale-110 transition-transform" />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-8 border-t border-slate-200 mt-8">
                <p className="text-xs lg:text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-[#005aa9] hover:text-[#004494] underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, icon: Icon, name, type, placeholder, value, onChange, required = false }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-slate-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full h-12 pl-11 pr-4 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005aa9]/30 focus:border-[#005aa9] transition-all bg-slate-50/50 placeholder-slate-400"
        placeholder={placeholder}
      />
    </div>
  </div>
);

// Password Field Component
const PasswordField = ({ label, name, value, onChange, showPassword, togglePassword, required = false }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-slate-700">{label}</label>
    <div className="relative">
      <input
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full h-12 pl-4 pr-12 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005aa9]/30 focus:border-[#005aa9] transition-all bg-slate-50/50 placeholder-slate-400"
        placeholder="Enter password"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center"
        onClick={togglePassword}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4 text-slate-400 hover:text-slate-500" />
        ) : (
          <Eye className="w-4 h-4 text-slate-400 hover:text-slate-500" />
        )}
      </button>
    </div>
  </div>
);

export default Register;
