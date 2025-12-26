import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Download, Upload, Loader2, X } from 'lucide-react';

export default function ImportExport({ type, onSuccess, onCancel }) {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    if (!file) return toast.error('Please select a file');

    const fd = new FormData();
    fd.append('file', file);
    setImporting(true);

    try {
      const endpoint = type === 'users' ? 'https://harsha-lucky-tours-final-backend.onrender.com/api/fromadmin/import' : 'https://harsha-lucky-tours-final-backend.onrender.com/api/pending/bulk-import';
      console.log(endpoint);
      
      const { data } = await axios.post(endpoint, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(data);
      

      toast.success(data.message || 'Imported successfully');
      if (data.errors?.length) {
        toast.error(`${data.errors.length} rows failed`);
      }
      onSuccess();
    } catch (err) {
      console.log(err);
      
      toast.error(err.response?.data?.message || 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  const downloadSample = () => {
    const rows = type === 'users'
      ? [
          { name: 'John Doe', email: 'john@example.com', phone: '+1234567890', city: 'Delhi' },
          { name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', city: 'Mumbai' },
        ]
      : [
          { email: 'john@example.com', amount: 500, dueDate: '2025-12-01', status: 'pending' },
          { email: 'jane@example.com', amount: 750, dueDate: '2025-12-05', status: 'pending' },
        ];

    const csv = [
      Object.keys(rows[0]).join(','),
      ...rows.map(r => Object.values(r).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample_${type}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Import {type === 'users' ? 'Users' : 'Payments'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="border rounded-lg p-5 bg-gray-50">
        <button
          onClick={downloadSample}
          className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          <Download className="w-4 h-4 mr-1" />
          Download Sample CSV
        </button>

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />

        <button
          onClick={handleImport}
          disabled={importing || !file}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {importing ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Importing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Import Now
            </>
          )}
        </button>

        <p className="mt-3 text-xs text-gray-600">
          <strong>Required:</strong>{' '}
          {type === 'users'
            ? 'name, email, phone, city'
            : 'email, amount, dueDate'}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}