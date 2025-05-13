import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewInterview = () => {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    fetchAssignedInterviews();
  }, []);

  const fetchAssignedInterviews = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/internships/cv/interviewpass", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.cvs) {
        setInterviews(response.data.cvs);
      }
    } catch (error) {
      console.error("Error fetching assigned interviews:", error);
    }
  };

  const updateInterviewStatus = async (status) => {
    if (!selectedInterview) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/internships/cv/update/${selectedInterview._id}/interviewStatus`,
        { interviewStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchAssignedInterviews();
      setSelectedInterview(null);
    } catch (error) {
      console.error("Error updating interview status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-screen w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">View Interview & Schedule</h2>

        {/* Action Buttons */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Export to Excel</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Export to PDF</button>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${selectedInterview ? "bg-green-500 text-white" : "bg-gray-400 text-gray-800 cursor-not-allowed"
                }`}
              disabled={!selectedInterview}
              onClick={() => updateInterviewStatus("pass")}
            >
              Pass
            </button>
            <button
              className={`px-4 py-2 rounded ${selectedInterview ? "bg-red-500 text-white" : "bg-gray-400 text-gray-800 cursor-not-allowed"
                }`}
              disabled={!selectedInterview}
              onClick={() => updateInterviewStatus("fail")}
            >
              Fail
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">NIC</th>
              <th className="border p-2">Application Ref No</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Mobile No</th>
              <th className="border p-2">Interview Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.length > 0 ? (
              interviews.map((cv) => (
                <tr
                  key={cv._id}
                  className={selectedInterview?._id === cv._id ? "bg-blue-100" : "cursor-pointer"}
                  onClick={() => setSelectedInterview(cv)}
                >
                  <td className="border p-2">{cv.nic}</td>
                  <td className="border p-2">{cv.referenceNumber}</td>
                  <td className="border p-2">{cv.nameWithInitials}</td>
                  <td className="border p-2">{cv.internshipCategory}</td>
                  <td className="border p-2">{cv.mobileNumber}</td>
                  <td className="border p-2 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold 
      ${cv.interviewStatus === "pass" ? "bg-green-100 text-green-700" : ""} 
      ${cv.interviewStatus === "fail" ? "bg-red-100 text-red-700" : ""} 
      ${cv.interviewStatus === "pending" ? "bg-green-100 text-orange-700" : ""}`}
                    >
                      {cv.interviewStatus === "pass" ? "✅ Passed" :
                        cv.interviewStatus === "fail" ? "❌ Failed" :
                          "⏳ Pending"}
                    </span>
                  </td>

                  <td className="border p-2 flex gap-2">
                    <button className="bg-gray-500 text-white px-4 py-1 rounded">Lifecycle</button>
                    <button className="bg-yellow-500 text-white px-4 py-1 rounded">Reschedule</button>
                    {/* Dropdown to update interview status */}
                    <select
                      className="border p-1 rounded"
                      value={cv.interviewStatus}
                      onChange={(e) => updateInterviewStatus(e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">No interviews assigned yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewInterview;
