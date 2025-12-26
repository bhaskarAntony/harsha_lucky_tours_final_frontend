// src/pages/admin/AdminPackages.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/Layout/AdminLayout';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { 
  Package as PackageIcon, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  DollarSign 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    destination: [''],
    couples: 1,
    duration: '5days',
    images: [''],
    description: '',
    inclusions: ['Accomodation', 'Flight charges all', 'Food', 'Travel Guid','Transportation', 'Games'],
    drawDate: '',
    month: '',
    year: 2026,
    monthlyInstallment: 0,
    status: 'upcoming',
    packageId: '',
    prizeDescription: 'THREE JYOTIRLINGA PACKAGE WITH SHIRDI (1 FAMILY 4 MEMBERS) OR 75K WORTH GOLD OR SILVER ORNAMENTS'  // NEW: Simple manual text field
  });

  useEffect(() => {
    fetchPackages();
  }, [currentPage, searchTerm]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('https://harsha-lucky-tours-final-backend.onrender.com/api/packages', {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm
        }
      });
      setPackages(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const payload = normalizeFormData(formData);
      await axios.post('https://harsha-lucky-tours-final-backend.onrender.com/api/packages', payload);
      toast.success('Package created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchPackages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create package');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditPackage = async (e) => {
    e.preventDefault();
    if (!selectedPackage) return;
    setFormLoading(true);

    try {
      const payload = normalizeFormData(formData);
      await axios.put(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${selectedPackage._id}`, payload);
      toast.success('Package updated successfully');
      setShowEditModal(false);
      resetForm();
      fetchPackages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update package');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`https://harsha-lucky-tours-final-backend.onrender.com/api/packages/${packageId}`);
        toast.success('Package deleted successfully');
        fetchPackages();
      } catch (error) {
        toast.error('Failed to delete package');
      }
    }
  };

  const openEditModal = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      name: pkg.name || '',
      destination: pkg.destination && pkg.destination.length ? pkg.destination : [''],
      couples: pkg.couples || 1,
      duration: pkg.duration || '',
      images: pkg.images && pkg.images.length ? pkg.images : [''],
      description: pkg.description || '',
      inclusions: pkg.inclusions && pkg.inclusions.length ? pkg.inclusions : [''],
      drawDate: pkg.drawDate ? new Date(pkg.drawDate).toISOString().split('T')[0] : '',
      month: pkg.month || '',
      year: pkg.year || new Date().getFullYear(),
      monthlyInstallment: pkg.monthlyInstallment || 0,
      status: pkg.status || 'upcoming',
      packageId: pkg.packageId || '',
      prizeDescription: pkg.prizeDescription || ''  // NEW
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      destination: [''],
      couples: 1,
      duration: '',
      images: [''],
      description: '',
      inclusions: [''],
      drawDate: '',
      month: '',
      year: new Date().getFullYear(),
      monthlyInstallment: 0,
      status: 'upcoming',
      packageId: '',
      prizeDescription: ''  // NEW
    });
    setSelectedPackage(null);
  };

  // Normalizes numbers before sending to backend
  const normalizeFormData = (data) => ({
    ...data,
    couples: Number(data.couples),
    monthlyInstallment: Number(data.monthlyInstallment),
    year: Number(data.year)
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (['destination', 'images', 'inclusions'].includes(name)) {
      const index = parseInt(e.target.dataset.index, 10);
      const updated = [...formData[name]];
      updated[index] = value;
      setFormData({ ...formData, [name]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (fieldName) => {
    const updated = [...formData[fieldName], ''];
    setFormData({ ...formData, [fieldName]: updated });
  };

  const removeField = (fieldName, index) => {
    const updated = formData[fieldName].filter((_, i) => i !== index);
    setFormData({ ...formData, [fieldName]: updated.length ? updated : [''] });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-blue-100 text-blue-800';
      case 'draw_completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Packages Management</h1>
            <p className="text-gray-600 text-sm">Manage tour packages and lucky draw prizes</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Package
          </button>
        </div>

        {/* Search */}
        <div className="card p-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search packages by name, destination, or month..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-field pl-10 w-full text-sm"
            />
          </div>
        </div>

        {/* Packages Table */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <PackageIcon className="w-5 h-5 mr-2" />
              All Packages ({packages.length})
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Draw Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Installment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                        <p className="text-xs text-gray-500">{pkg.packageId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {pkg.destination?.join(', ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.drawDate ? new Date(pkg.drawDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-green-600 flex items-center">
                        <DollarSign className="w-3 h-3 mr-0.5" />
                        {(pkg.monthlyInstallment || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                        {pkg.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link to={`/admin/package/details/${pkg._id}`} className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(pkg)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{pkg.name}</p>
                    <p className="text-xs text-gray-500">{pkg.packageId}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                    {pkg.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Destination
                    </p>
                    <p className="font-medium text-gray-900">{pkg.destination?.join(', ')}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium text-gray-900">{pkg.duration}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Draw Date</p>
                    <p className="font-medium text-gray-900">
                      {pkg.drawDate ? new Date(pkg.drawDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Installment</p>
                    <p className="font-medium text-green-600">
                      ₹{(pkg.monthlyInstallment || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
                  <Link
                    to={`/admin/package/details/${pkg._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => openEditModal(pkg)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create/Edit Package Modal */}
        <Modal
          isOpen={showCreateModal || showEditModal}
          onClose={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
          title={showCreateModal ? 'Create New Package' : 'Edit Package'}
          size="xl"
        >
          <form onSubmit={showCreateModal ? handleCreatePackage : handleEditPackage} className="space-y-6 text-sm">
            {/* BASIC DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Package Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Package Id *</label>
                <input
                  type="text"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Monthly Installment *</label>
                <input
                  type="number"
                  name="monthlyInstallment"
                  value={formData.monthlyInstallment}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                  min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Destinations *</label>
                {formData.destination.map((dest, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      data-index={index}
                      name="destination"
                      value={dest}
                      onChange={handleFormChange}
                      className="input-field flex-1"
                      placeholder={`Destination ${index + 1}`}
                      required={index === 0}
                    />
                    {formData.destination.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField('destination', index)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField('destination')}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                >
                  + Add Destination
                </button>
              </div>
            </div>

            {/* DURATION / DATES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleFormChange}
                  className="input-field"
                  placeholder="4 Days 3 Nights"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Couples *</label>
                <input
                  type="number"
                  name="couples"
                  value={formData.couples}
                  onChange={handleFormChange}
                  className="input-field"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Draw Date *</label>
                <input
                  type="date"
                  name="drawDate"
                  value={formData.drawDate}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Month *</label>
                <input
                  type="text"
                  name="month"
                  value={formData.month}
                  onChange={handleFormChange}
                  className="input-field"
                  placeholder="January"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className="input-field"
                rows={3}
                placeholder="Package description..."
              />
            </div>

            {/* PRIZE DESCRIPTION - NEW SIMPLE TEXTAREA */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Prize Description (shown to users) *
              </label>
              <textarea
                name="prizeDescription"
                value={formData.prizeDescription}
                onChange={handleFormChange}
                className="input-field"
                rows={3}
                placeholder='e.g. "BABA BAIDYANATH DHAM (1 FAMILY 4 PERSONS) OR 75K WORTH GOLD OR SILVER ORNAMENTS"'
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Type exactly how you want the prize to display to users (trip, gold, silver, etc.)
              </p>
            </div>

            {/* IMAGES + INCLUSIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Image URLs</label>
                {formData.images.map((img, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="url"
                      data-index={index}
                      name="images"
                      value={img}
                      onChange={handleFormChange}
                      className="input-field flex-1"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField('images', index)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField('images')}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                >
                  + Add Image
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Inclusions</label>
                {formData.inclusions.map((inc, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      data-index={index}
                      name="inclusions"
                      value={inc}
                      onChange={handleFormChange}
                      className="input-field flex-1"
                      placeholder="Accommodation, Meals..."
                    />
                    {formData.inclusions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField('inclusions', index)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField('inclusions')}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                >
                  + Add Inclusion
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="btn-primary flex items-center text-sm"
              >
                {formLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    {showCreateModal ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  showCreateModal ? 'Create Package' : 'Update Package'
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminPackages;
