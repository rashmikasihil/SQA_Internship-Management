import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pending from '../../assets/pending.png';
import { motion } from "framer-motion";

const ViewApprovedCVs = () => {
  // Filter state
  const [filters, setFilters] = useState({
    district: '',
    institute: '',
    status: '',
    search: '',
  });

  // State for approved CVs, loading, error and selected CV
  const [approvedCVs, setApprovedCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCVId, setSelectedCVId] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Set up the axios instance with the Authorization header if token exists
  const axiosInstance = axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Fetch approved CVs from backend when component mounts
  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/internships/cv/allcv'); // Adjust endpoint as needed
        // Assuming response.data.cvs contains the list of CVs
        setApprovedCVs(response.data.cvs);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchCVs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter logic based on filters state
  const filteredCVs = approvedCVs.filter((cv) => {
    return (
      (filters.district === '' || cv.district === filters.district) &&
      (filters.institute === '' || cv.institute === filters.institute) &&
      (filters.status === '' || cv.status === filters.status) &&
      (filters.search === '' ||
        cv.nameWithInitials.toLowerCase().includes(filters.search.toLowerCase()) ||
        cv.nic.includes(filters.search))
    );
  });

  // Delete a CV from the backend and update state
  // const handleDelete = async (id) => {
  //   try {
  //     await axiosInstance.delete(`http://localhost:5000/api/cvs/${id}`); // Adjust endpoint if needed
  //     setApprovedCVs((prev) => prev.filter((cv) => cv._id !== id));
  //   } catch (err) {
  //     console.error('Delete failed: ', err);
  //   }
  // };

  // Handle edit (e.g., navigate to an edit page or open a modal)
  // const handleEdit = (cv) => {
  //   console.log('Edit CV: ', cv);
  //   // Implement your edit functionality here
  // };

  // Handle Approve CV: update the status field for the selected CV
  // const handleApproveCV = async () => {
  //   if (!selectedCVId) {
  //     console.error('No CV selected for approval');
  //     return;
  //   }
  //   try {
  //     // Assuming your backend PATCH route is: /api/cvs/:id/status
  //     const response = await axiosInstance.put(`http://localhost:5000/api/internships/cv/update/${selectedCVId}/status`, {
  //       status: 'approved', // Update the status as needed
  //     });

  //     // Update the local state: update the approved CV in the list
  //     setApprovedCVs(prev => prev.map(cv =>
  //       cv._id === selectedCVId ? { ...cv, status: response.data.cv.status } : cv
  //     ));

  //     // Optionally clear selection
  //     setSelectedCVId(null);
  //     console.log('CV approved successfully');
  //   } catch (error) {
  //     console.error("Error updating CV status:", error);
  //   }
  // };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
          <img src={pending} alt="pending" className="w-10 h-10 mr-2" />
          Interns Status
        </h1>
      </div>

      {/* Filter & Action Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search by Name or NIC..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
              <i className="fas fa-search mr-2"></i>
              Search
            </button>
          </div>


        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">District</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
            >
              <option value="">Select District</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kandy">Kandy</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Institute</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={filters.institute}
              onChange={(e) => handleFilterChange('institute', e.target.value)}
            >
              <option value="">Select Institute</option>
              <option value="SLIIT">SLIIT</option>
              <option value="UCSC">UCSC</option>
              <option value="NSBM">NSBM</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Intern Type</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading/Error state */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        /* Table Section */
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 border">Select</th>
                <th className="p-3 border">NIC</th>
                <th className="p-3 border">Ref No</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Intern Type</th>
                <th className="p-3 border">Application Date</th>
                <th className="p-3 border">District</th>
                <th className="p-3 border">Institute</th>
                {/* <th className="p-3 border">Delete</th> */}
                <th className="p-3 border">Life Cycle</th>
                {/* <th className="p-3 border">Action</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCVs.length > 0 ? (
                filteredCVs.map((cv) => (
                  <tr key={cv._id} className="hover:bg-gray-100">
                    <td className="p-3">
                      {/* Use radio button to select one CV at a time */}
                      <input
                        type="radio"
                        name="selectedCV"
                        checked={selectedCVId === cv._id}
                        onChange={() => setSelectedCVId(cv._id)}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                    </td>
                    <td className="p-3">{cv.nic}</td>
                    <td className="p-3">{cv.referenceNumber}</td>
                    <td className="p-3">{cv.nameWithInitials}</td>
                    <td className="p-3">{cv.applyAs}</td>
                    <td className="p-3">{new Date(cv.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">{cv.district}</td>
                    <td className="p-3">{cv.institute}</td>
                    {/* <td className="p-3">
                      <button
                        onClick={() => handleDelete(cv._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Delete
                      </button>
                    </td> */}
                    <td className="p-3">
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all
      ${cv.status === 'approved' ? 'bg-green-200 text-green-700' : ''} 
      ${cv.status === 'pending' ? 'bg-yellow-200 text-yellow-700 animate-pulse' : ''} 
      ${cv.status === 'rejected' ? 'bg-red-200 text-red-700' : ''}`}
  >
    {cv.status === 'approved' && '✅ Approved'}
    {cv.status === 'pending' && '⏳ Pending'}
    {cv.status === 'rejected' && '❌ Rejected'}
  </motion.span>
</td>

                    {/* <td className="p-3">
                      <button
                        onClick={() => handleEdit(cv)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-center" colSpan="11">
                    No CVs match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewApprovedCVs;
