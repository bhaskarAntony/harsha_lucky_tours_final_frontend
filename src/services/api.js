import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
  logout: () => api.post('/auth/logout'),
};

// User API
export const userAPI = {
  getDashboard: () => api.get('/users/dashboard'),
  getPaymentHistory: (params) => api.get('/users/payments', { params }),
  getActivePackages: () => api.get('/users/packages'),
  getWinHistory: () => api.get('/users/wins'),
  joinDraw: (drawData) => api.post('/users/join-draw', drawData),
  getNotifications: () => api.get('/users/notifications'),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updatePaymentStatus: (id, paymentData) => api.put(`/admin/payments/${id}`, paymentData),
  conductDraw: (id) => api.post(`/admin/draws/${id}/conduct`),
  bulkUploadUsers: (formData) => api.post('/admin/users/bulk-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  sendNotification: (notificationData) => api.post('/admin/notifications/send', notificationData),
};

// Package API
export const packageAPI = {
  getPackages: (params) => api.get('/packages', { params }),
  getPackage: (id) => api.get(`/packages/${id}`),
  getCurrentPackage: () => api.get('/packages/current'),
  getWinners: () => api.get('/packages/winners'),
  joinPackage: (id) => api.post(`/packages/${id}/join`),
  createPackage: (packageData) => api.post('/packages', packageData),
  updatePackage: (id, packageData) => api.put(`/packages/${id}`, packageData),
  deletePackage: (id) => api.delete(`/packages/${id}`),
  uploadLiveVideo: (id, videoUrl) => api.put(`/packages/${id}/live-video`, { liveVideoUrl: videoUrl }),
  conductDraw: (id) => api.post(`/packages/${id}/conduct-draw`),
  uploadDrawVideo: (id, videoUrl) => api.put(`/packages/${id}/draw-video`, { drawVideoUrl: videoUrl }),
  uploadWinnerFeedback: (id, data) => api.put(`/packages/${id}/winner-feedback`, data),
};

// Payment API
export const paymentAPI = {
  getPayments: (params) => api.get('/payments', { params }),
  getPayment: (id) => api.get(`/payments/${id}`),
  createPayment: (paymentData) => api.post('/payments', paymentData),
  updatePayment: (id, paymentData) => api.put(`/payments/${id}`, paymentData),
  deletePayment: (id) => api.delete(`/payments/${id}`),
  exportPayments: (params) => api.get('/payments/export', { 
    params, 
    responseType: 'blob' 
  }),
};

// Contact API
export const contactAPI = {
  submitContact: (contactData) => api.post('/contact', contactData),
};

// Reports API
export const reportsAPI = {
  getUserReport: (params) => api.get('/reports/users', { params }),
  getPaymentReport: (params) => api.get('/reports/payments', { params }),
  getDrawReport: (params) => api.get('/reports/draws', { params }),
  getRevenueReport: (params) => api.get('/reports/revenue', { params }),
};

export default api;