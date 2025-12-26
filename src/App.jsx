// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Auth pages (no layout)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLogin from './pages/admin/Login';

// Public pages WITH Header + Footer
import Home from './pages/all/Home';
import About from './pages/all/About';
import Contact from './pages/all/Contact';
import Sitemap from './pages/all/Sitemap';
import MemberPackages from './pages/all/MemberPackages';
import NonMemberPackages from './pages/all/NonMemberPackages';
import PrivacyPolicy from './pages/all/PrivacyPolicy';

// User pages (no layout)
import UserDashboard from './pages/user/Dashboard';
import LuckyDrawPlayground from './pages/user/LuckyDrawPlayground';
import LivePage from './pages/user/LivePage';
import UserProfile from './pages/user/Profile';
import PackageDetails from './pages/user/PackageDetails';

// Admin pages (no layout)
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import UserDetails from './pages/admin/UserDetails';
import AdminPackages from './pages/admin/AdminPackages';
import AdminPayments from './pages/admin/AdminPayments';
import AdminPackageDetails from './pages/admin/AdminPackageDetails';
import Notifications from './pages/admin/Notifications';
import PendingPayments from './pages/admin/PendingPayments';
import AdminCurrentPackage from './pages/admin/AdminCurrentPackage';
import AdminProfile from './pages/admin/AdminProfile';
import MemberPackageDetails from './pages/all/MemeberPackageDetails';
import ScrollToTop from './components/ScrollToTop';

// ---------------------------------------------------------------------
// Layout with Header + Footer
// ---------------------------------------------------------------------
function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------
// App – NO BrowserRouter here
// ---------------------------------------------------------------------
function App() {
  return (
    <AuthProvider>
      <ScrollToTop/>
      <Routes>
        {/* ==== PUBLIC WITH LAYOUT ==== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/member/package/details/:id" element={<MemberPackageDetails />} />
          <Route path="/member/packages" element={<MemberPackages />} />
          <Route path="/non-member/packages" element={<NonMemberPackages />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>

        {/* ==== AUTH (no layout) ==== */}
        <Route path="/admin/login" element={<AdminLogin />} />
      

        {/* ==== USER PROTECTED ==== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lucky-draw"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <LuckyDrawPlayground />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <LivePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/package/:id"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <PackageDetails />
            </ProtectedRoute>
          }
        />

        {/* ==== ADMIN PROTECTED ==== */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/packages"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminPackages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/package/details/:id"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminPackageDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pending"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <PendingPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/current-package"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminCurrentPackage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* ==== REDIRECTS ==== */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;