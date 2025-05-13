import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/solid";


const InterviewDetails = ({ interviewId, closeModal }) => {
  const [interview, setInterview] = useState(null);
  const [internDetails, setInternDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/interviews/${interviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterview(response.data.interview);

        if (response.data.interview.assignedInterns.length > 0) {
          const internData = await Promise.all(
            response.data.interview.assignedInterns.map(async (cvId) => {
              const res = await axios.get(`http://localhost:5000/api/internships/cv/${cvId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            })
          );
          setInternDetails(internData);
        }
      } catch (err) {
        setError("Error fetching interview details");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  if (loading) return <div className="text-center p-10 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-red-500 font-semibold text-center">{error}</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative"
      >
        <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
          <XCircleIcon className="w-6 h-6" />
        </button>
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">{interview.title}</h2>
          <p className="text-lg text-gray-600 mt-2">{new Date(interview.date).toLocaleDateString()} | {interview.location}</p>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Assigned Interns:</h3>
        {internDetails.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border p-3">#</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Mobile</th>
                 


                </tr>
              </thead>
              <tbody>
                {internDetails.map((intern, index) => (
                  <tr key={index} className="text-center bg-gray-100 odd:bg-white">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3 font-medium text-gray-900">{intern.cv.nameWithInitials}</td>
                    <td className="border p-3 text-gray-700">{intern.cv.email}</td>
                    <td className="border p-3 text-gray-700">{intern.cv.mobileNumber}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No interns assigned.</p>
        )}
      </motion.div>
    </div>
  );
};

export default InterviewDetails;
