import React, { useState } from "react";
import { userService } from "../services/userService";
import SuccessModal from "../components/SuccessModal";

const InternRegistration = () => {
  const [formData, setFormData] = useState({

    username: "",
    fullname: "",
    namewithinitials: "",
    address: "",
    contactnumber: "",
    nic: "",
    dob: "",
    District: "",
    language: "",
    email: "",
    password: "",
    role: "intern",
    adminID: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const upperCaseCriteria = /[A-Z]/.test(password);

    if (!lengthCriteria) {
      setPasswordStrength("Password must be at least 8 characters.");
    } else if (!numberCriteria) {
      setPasswordStrength("Password must include at least one number.");
    } else if (!specialCharCriteria) {
      setPasswordStrength("Password must include at least one special character.");
    } else if (!upperCaseCriteria) {
      setPasswordStrength("Password must include at least one uppercase letter.");
    } else {
      setPasswordStrength("Strong password.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength !== "Strong password.") {
      alert("Please fix password issues before submitting.");
      return;
    }

    try {
      const response = await userService.registerIntern(formData);
      response && setShowModal(true);
      setError("");
      setTimeout(() => {
        window.location.reload(); // This refreshes the page
      }, 2000); 
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-lg p-8 flex w-screen">
        {/* Illustration */}
        <div className="w-1/2 h-2/3 hidden md:flex justify-center items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/775/677/non_2x/browse-online-listings-registration-or-register-user-interface-users-use-secure-logins-and-passwords-online-registration-collection-sign-flat-illustration-on-white-background-vector.jpg" // Replace with your illustration
            alt="Illustration"
            className="rounded-md"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-center">Create Account in IMS</h2>
          {message && <div className="text-green-500 mb-4">{message}</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            {/* Radio Buttons */}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Full Name and Name with Initials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name with Initials:</label>
                <input
                  type="text"
                  name="namewithinitials"
                  value={formData.namewithinitials}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter initials"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your address"
                required
              />
            </div>

            {/* Contact Number and NIC */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number:</label>
                <input
                  type="text"
                  name="contactnumber"
                  value={formData.contactnumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIC:</label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter NIC"
                  required
                />
              </div>
            </div>

            {/* Language and District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language:</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter language"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District:</label>
                <input
                  type="text"
                  name="District"
                  value={formData.District}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter district"
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
        <label className="block text-sm font-medium">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        {passwordStrength && (
          <p
            className={`text-sm mt-1 ${
              passwordStrength === "Strong password."
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {passwordStrength}
          </p>
        )}
      </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-150"
            >
              Register
            </button>
          </form>

        </div>
      </div>
    </div>
    <SuccessModal 
      show={showModal}
      message={"Registration Successful"}
      onClose={() => setShowModal(false)}
    />
    </>
    
  );
};

export default InternRegistration;
