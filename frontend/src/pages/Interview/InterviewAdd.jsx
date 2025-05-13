import React, { useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import addinterview from "../../assets/addinterview.png"; // Update with the correct path to the image

const AddInterviewForm = () => {
  const [interview, setInterview] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");
    
    // Get token from localStorage if you need to send it in the request headers.
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/interviews/create", // Adjust endpoint as needed
        interview,
        {
          headers: {  
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      
      console.log("Interview details submitted:", response.data);
      setSuccessMessage("Interview added successfully!");
      // Optionally reset the form.
      setInterview({
        label: "",
        date: "",
        time: "",
        location: "",
        description: "",
      });
    } catch (err) {
      console.error("Error submitting interview:", err);
      setError(err.response?.data?.message || err.message || "Error submitting interview");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setInterview({
      label: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });
  };

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center">
        <span>
          <img src={addinterview} alt="Add Interview" className="w-7 h-7 mx-auto mr-2" />
        </span>
        Add New Interview
      </h1>
      <div className="bg-white/90 p-8 rounded-xl shadow-2xl w-4/5 mt-5 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Interview Label */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-semibold text-gray-800">Interview Label:</label>
            <input
              type="text"
              name="title"
              value={interview.title}
              onChange={handleChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              placeholder="Enter interview label"
              required
            />
          </div>

          {/* Date */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-semibold text-gray-800">Date:</label>
            <div className="relative flex-grow">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="date"
                name="date"
                value={interview.date}
                onChange={handleChange}
                className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                required
              />
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-semibold text-gray-800">Time:</label>
            <div className="relative flex-grow">
              <FaClock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="time"
                name="time"
                value={interview.time}
                onChange={handleChange}
                className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-semibold text-gray-800">Location:</label>
            <div className="relative flex-grow">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="location"
                value={interview.location}
                onChange={handleChange}
                className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
                placeholder="Enter location"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start space-x-4">
            <label className="w-1/4 text-sm font-semibold text-gray-800 pt-2">Description:</label>
            <div className="relative flex-grow">
              <FaInfoCircle className="absolute left-3 top-3 text-gray-500" />
              <textarea
                name="description"
                value={interview.description}
                onChange={handleChange}
                className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
                placeholder="Enter a brief description"
                required
              ></textarea>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 font-medium">
              {error}
            </div>
          )}
          {/* Success Message */}
          {successMessage && (
            <div className="text-green-500 font-medium">
              {successMessage}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInterviewForm;
