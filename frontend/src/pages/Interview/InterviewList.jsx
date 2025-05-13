import React, { useEffect, useState } from "react";
import axios from "axios";
import InterviewDetails from "./InterviewDetails";

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/interviews/", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        setInterviews(response.data.interviews);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching interviews");
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter((interview) =>
    interview.title.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (interview) => {
    setSelectedInterview(interview);
  };

  const closeModal = () => {
    setSelectedInterview(null);
  };

  if (loading) return <p>Loading interviews...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 ">

<h2 className="text-3xl font-bold text-gray-700 ml-4 mt-10 ">
          View All Interviews
        </h2>
      <div className="container mx-auto  bg-white p-6 rounded-lg shadow-lg mt-6">
       
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
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr >
            <th className="border px-6 py-3 text-left text-gray-600 font-medium">Interview Label</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Date & Time</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Location</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Description</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Edit</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Action</th>
                  <th className="border px-6 py-3 text-left text-gray-600 font-medium">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterviews.map((interview) => (
              <tr key={interview._id} className="text-center">
                <td className="border p-2">{interview.title}</td>
                <td className="border p-2">{new Date(interview.date).toLocaleString()}</td>
                <td className="border p-2">{interview.location}</td>
                <td className="border p-2">{interview.description}</td>
                <td className="border p-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    Edit
                  </button>
                </td>
            
                <td className="border p-2">
                  <button
                    onClick={() => openModal(interview)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
                <td className="border p-2">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedInterview && (
          <InterviewDetails interviewId={selectedInterview._id} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default InterviewList;
