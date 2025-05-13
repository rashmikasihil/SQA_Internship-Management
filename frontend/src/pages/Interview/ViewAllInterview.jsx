import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllInterview = () => {
  const [search, setSearch] = useState('');
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);

  // Fetch interviews from the backend when component mounts
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token inside useEffect
        const axiosInstance = axios.create({
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        const response = await axiosInstance.get('http://localhost:5000/api/interviews/');
        setInterviews(response.data.interviews);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching interviews');
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  // Filter interviews based on search input
  const filteredData = interviews.filter(
    (item) =>
      (item.title ? item.title.toLowerCase() : '').includes(search.toLowerCase()) ||
      (item.location ? item.location.toLowerCase() : '').includes(search.toLowerCase())
  );

  // Handle row click to open the modal
  const handleRowClick = (interview) => {
    setSelectedInterview(interview);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 ">View All Interviews</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Interview Label or Location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Add New Interview
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
              Schedule Interview
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center p-4">Loading interviews...</div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">Error: {error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Interview Label</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Date & Time</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Location</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Edit</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Action</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((interview, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(interview)}
                    >
                      <td className="border px-6 py-3">{interview.title}</td>
                      <td className="border px-6 py-3">
                        {new Date(interview.date).toLocaleDateString()} {interview.time}
                      </td>
                      <td className="border px-6 py-3">{interview.location}</td>
                      <td className="border px-6 py-3">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                          Edit
                        </button>
                      </td>
                      <td className="border px-6 py-3">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                          Action
                        </button>
                      </td>
                      <td className="border px-6 py-3">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center px-6 py-3">
                      No interviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Interview Details Modal */}
      {selectedInterview && (
        <InterviewDetailsModal
          interview={selectedInterview}
          onClose={() => setSelectedInterview(null)}
        />
      )}
    </div>
  );
};

// Interview Details Modal Component
const InterviewDetailsModal = ({ interview, onClose }) => {
  if (!interview) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{interview.title}</h2>
        <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {interview.time}</p>
        <p><strong>Location:</strong> {interview.location}</p>
        <p><strong>Assign Interns:</strong> {interview.assignedInterns || 'No description available.'}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllInterview;
