import React from "react";

const AddInstituteForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Add New Institute
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Institute Name */}
            <div>
              <label
                htmlFor="instituteName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institute Name
              </label>
              <input
                type="text"
                id="instituteName"
                placeholder="Institute Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              />
            </div>

            {/* Institute Type */}
            <div>
              <label
                htmlFor="instituteType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institute Type
              </label>
              <select
                id="instituteType"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              >
                <option value="">Select Type</option>
                <option value="University">University</option>
                <option value="College">College</option>
                <option value="School">School</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="w-full px-4 py-2  placeholder-gray-400 text-gray-800"
              >
                Department/Faculty
              </label>
              <input
                type="text"
                id="department"
                placeholder="Department/Faculty"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              />
            </div>

            {/* Contact Person Name */}
            <div>
              <label
                htmlFor="contactPersonName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Person Name
              </label>
              <input
                type="text"
                id="contactPersonName"
                placeholder="Contact Person Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              />
            </div>

            {/* Contact Person Number */}
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Person Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Contact Person Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              />
            </div>

            {/* Institute Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institute Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Institute Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              />
            </div>

            {/* Institute Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institute Address
              </label>
              <textarea
                id="address"
                rows="4"
                placeholder="Institute Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              ></textarea>
            </div>

            {/* Contact Person Email */}
            <div>
              <label
                htmlFor="contactPersonEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Person Email
              </label>
              <input
                type="email"
                id="contactPersonEmail"
                placeholder="Contact Person Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-800"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
            >
              Add Institute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInstituteForm;
