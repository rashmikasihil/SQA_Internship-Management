import React ,{ useEffect, useState } from "react";
import { FaUserEdit, FaClipboardList, FaCertificate } from "react-icons/fa";
import Header from "../../components/Header";
import UserSidebar from "../../components/UserSideBard";
import SLT from '../../assets/SLT.png';
import { motion } from "framer-motion";


const InternshipManagement = () => {
  const [cvStatus, setCvStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCVStatus = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        // Decode token to get userId
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;

        // Fetch data
        const response = await fetch(`http://localhost:5000/api/internships/cv/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch CV status");
        }

        setCvStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCVStatus();
  }, []);






  
  return (
    <div className="flex h-screen">
       
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-300">
        <UserSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-8">
        <div className="flex justify-center items-center mt-1">
          <img src={SLT} alt="SLT" className="w-1/5 h-fit" />
        </div>
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome to SLT Internship Management System
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Check your intern status
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ActionCard
              href="/"
              bgColor="bg-green-500"
              hoverColor="hover:bg-green-600"
              icon={<FaUserEdit className="text-4xl mb-4" />}
              text="Update Profile"
            />
            <ActionCard
              href="/add-new-cv-by-intern"
              bgColor="bg-green-700"
              hoverColor="hover:bg-green-900"
              icon={<FaClipboardList className="text-4xl mb-4" />}
              text="Report Internship Placement"
            />
            <ActionCard
              href="/"
              bgColor="bg-green-900"
              hoverColor="hover:bg-green-950"
              icon={<FaCertificate className="text-4xl mb-4" />}
              text="Request Certificates"
            />
          </div>

          {/* Internship Status Table */}
          {/* import { motion } from "framer-motion"; */}

<div className="bg-white shadow-lg rounded-2xl p-8 mt-12">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Internship Status
  </h2>

  {loading ? (
    <p className="text-center text-gray-500 text-lg">Loading...</p>
  ) : error ? (
    <p className="text-center text-red-500 font-medium">{error}</p>
  ) : cvStatus ? (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-800 text-white text-lg">
            <th className="border p-4">Application Ref No</th>
            <th className="border p-4">Name</th>
            <th className="border p-4">CV Status</th>
            <th className="border p-4">Apply As</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100 transition">
            <td className="border p-4 text-center text-gray-700 font-medium">
              {cvStatus.referenceNumber}
            </td>
            <td className="border p-4 text-center text-gray-700 font-medium">
              {cvStatus.nameWithInitials}
            </td>
            <td className="border p-4 text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all
                  ${cvStatus.status === "approved" ? "bg-green-500 text-white" : ""} 
                  ${cvStatus.status === "pending" ? "bg-green-400 text-white animate-pulse" : ""} 
                  ${cvStatus.status === "rejected" ? "bg-red-500 text-white" : ""}`}
              >
                {cvStatus.status === "approved" && "✅ Approved"}
                {cvStatus.status === "pending" && "⏳ Pending"}
                {cvStatus.status === "rejected" && "❌ Rejected"}
              </motion.span>
            </td>
            <td className="border p-4 text-center">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500 text-white shadow">
                {cvStatus.applyAs}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center text-gray-500">No data to display</p>
  )}
</div>


          {/* About Section */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800">
              About SLT Training Programs
            </h2>
            <p className="text-gray-600 mt-4">
              Sri Lanka Telecom PLC is the national Information and
              Communications Technology (ICT) solutions provider. Our internship
              programs provide students and graduates with valuable hands-on
              experience in the telecommunications and IT industry, helping them
              build their careers.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

const ActionCard = ({ href, bgColor, hoverColor, icon, text }) => (
  <a href={href}>
    <button
      className={`text-white text-3xl py-8 px-4 rounded-lg shadow-lg transition duration-300 w-full h-44 flex flex-col items-center justify-center ${bgColor} ${hoverColor}`}
    >
      {icon}
      {text}
    </button>
  </a>
);

export default InternshipManagement;
