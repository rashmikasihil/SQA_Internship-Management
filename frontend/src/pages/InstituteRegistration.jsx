// InstituteRegistration.js
import React from 'react';

const InstituteRegistration = ({onFlip}) => {
  return (
    // Background Image


      <div
      className="flex h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),  url("https://cdn.leonardo.ai/users/102ca45a-7c57-44f4-8f5a-a8bc2ccaa236/generations/b6ff0492-5e80-4919-b3eb-af195f205772/variations/Default_A_clean_and_modern_illustration_of_an_educational_inst_3_b6ff0492-5e80-4919-b3eb-af195f205772_0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Optional: makes the background fixed when scrolling
      }}
    >

      {/* Right Section */}
      <div className="w-full h-full  flex justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Institute Registration
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="instituteName"
            >
              Institute Name
            </label>
            <input
              id="instituteName"
              type="text"
              placeholder="Enter your institute name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactPerson"
            >
              Contact Person's Name
            </label>
            <input
              id="contactPerson"
              type="text"
              placeholder="Enter contact person's name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Enter address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
          >
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-green-500">
              Login
            </a>
          </p>
          <a href="/intern-register" className="mt-10 text-sm text-green-500 underline hover:text-green-900 ml-24">
        Switch to Intern Registration
        </a>
        </form>
      </div>
    </div>
  );
};

export default InstituteRegistration;
