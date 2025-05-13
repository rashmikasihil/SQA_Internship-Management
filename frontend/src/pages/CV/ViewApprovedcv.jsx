import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const ViewApprovedCVs = () => {
  // State for filters
  const [filters, setFilters] = useState({
    district: '',
    institute: '',
    internType: '',
    search: '',
  });

  // State for approved CVs, loading, and error
  const [approvedCVs, setApprovedCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for selected CV and modal visibility
  const [selectedCVId, setSelectedCVId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [interviewList, setInterviewList] = useState([]);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Create an axios instance with Authorization header
  const axiosInstance = axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Fetch approved CVs from backend when component mounts
  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/internships/cv/approved');
        setApprovedCVs(response.data.cvs);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching data');
        setLoading(false);
      }
    };
  
    fetchCVs();
  }, [axiosInstance]);

  // Fetch interview list
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/interviews');
        console.log('Fetched Interviews:', response.data);
        setInterviewList(response.data.interviews);
      } catch (err) {
        console.error('Error fetching interviews:', err);
      }
    };
  
    fetchInterviews();
  }, [axiosInstance]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter logic based on filters state
  const filteredCVs = approvedCVs.filter((cv) => {
    return (
      (filters.district === '' || cv.district === filters.district) &&
      (filters.institute === '' || cv.institute === filters.institute) &&
      (filters.internType === '' || cv.internType === filters.internType) &&
      (filters.search === '' ||
        cv.nameWithInitials.toLowerCase().includes(filters.search.toLowerCase()) ||
        cv.nic.includes(filters.search))
    );
  });

  // Assign interview to selected CV
  const handleAssignInterview = async (interviewID) => {
    if (!selectedCVId) {
      alert('Please select a CV to assign an interview');
      return;
    }

    console.log('Selected CV ID:', selectedCVId);
    console.log('Interview ID:', interviewID);

    try {
      const response = await axiosInstance.post(
        `http://localhost:5000/api/internships/cv/${selectedCVId}/assign-interview`,
        { interviewID }
      );
      console.log('Response:', response.data);
      alert('Interview assigned successfully');
      setShowModal(false);
    } catch (err) {
      console.error('Error assigning interview:', err.response?.data || err.message);
      alert('Failed to assign interview');
    }
  };

  // const Addnewcv = () => {
  //   window.location.href = '/add-new-cv';
  // };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" /> View All Approved CVs
        </h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <input
          type="text"
          placeholder="Search by Name or NIC..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">Error: {error}</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 border">Select</th>
                <th className="p-3 border">NIC</th>
                <th className="p-3 border">Ref No</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCVs.map((cv) => (
                <tr key={cv._id} className="hover:bg-gray-100">
                  <td className="p-3">
                    <input
                      type="radio"
                      name="selectedCV"
                      value={cv._id}
                      onChange={() => setSelectedCVId(cv._id)}
                      checked={selectedCVId === cv._id}
                    />
                  </td>
                  <td className="p-3">{cv.nic}</td>
                  <td className="p-3">{cv.referenceNumber}</td>
                  <td className="p-3">{cv.nameWithInitials}</td>
                  <td className="p-3">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                      onClick={() => setShowModal(true)}
                      disabled={!selectedCVId}
                    >
                      Schedule Interview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for selecting interview */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Select an Interview</h2>
            <ul className="space-y-2">
              {interviewList.map((interview) => (
                <li key={interview._id} className="flex justify-between items-center">
                  <span>{interview.title} (ID: {interview._id})</span>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => handleAssignInterview(interview._id)}
                  >
                    Assign
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApprovedCVs;
