import React from 'react';
import { FaFileAlt, FaUserCheck, FaCalendarAlt, FaProjectDiagram,FaSitemap, FaEnvelopeOpenText, FaUniversity, FaSyncAlt } from 'react-icons/fa';
import Header from '../../components/Header';
import SLT from '../../assets/SLT.png';
import Footer from '../../components/Footer';

const adminManagementSystem = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex justify-center items-center mt-1">
          <img src={SLT} alt="SLT" className="w-1/5 h-fit" />
        </div>
        <div className="flex justify-center items-center mt-4">
          <h1 className="text-3xl font-semibold text-gray-800 flex">
            Manage Interns and Placements
          </h1>
        </div>
        <div className="flex justify-center items-center mt-4">
          <h1 className="text-xl font-semibold text-gray-800 flex">
            Manage & schedule Interns
          </h1>
        </div>
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="grid grid-cols-4 gap-6 h-44">
            {/* Manage CV */}
            <div className="bg-green-500 text-white p-6 rounded-lg shadow hover:bg-green-600 cursor-pointer">
              <div className="flex items-center">
                <FaFileAlt className="text-7xl mr-4  my-7" />
                <div>
                  <h2 className="text-lg font-bold">Manage CV</h2>
                  <p>All CVs</p>
                </div>
              </div>
            </div>

            {/* Interviews */}
            <div className="bg-green-700 text-white p-6 rounded-lg shadow hover:bg-green-800 cursor-pointer">
              <div className="flex items-center">
                <FaUserCheck className="text-7xl mr-4  my-7" />
                <div>
                  <h2 className="text-lg font-bold">Interviews</h2>
                  <p>Select interns</p>
                </div>
              </div>
            </div>

            {/* Inductions */}
            <div className="bg-green-800 text-white p-6 rounded-lg shadow hover:bg-green-900 cursor-pointer">
              <div className="flex items-center">
                <FaCalendarAlt className="text-7xl mr-4  my-7" />
                <div>
                  <h2 className="text-lg font-bold">Inductions</h2>
                  <p>Schedule inductions</p>
                </div>
              </div>
            </div>

            {/* Schemes */}
            <div className="bg-green-900 text-white p-6 rounded-lg shadow hover:bg-green-950 cursor-pointer">
              <div className="flex items-center">
                <FaProjectDiagram className="text-7xl mr-4  my-7" />
                <div>
                  <h2 className="text-lg font-bold">Schemes</h2>
                  <p>Manage Schemes</p>
                </div>
              </div>
            </div>
          </div>




          
        </main>

        <div className="flex justify-center items-center mt-4">
        <h1 className="text-3xl font-semibold text-gray-800 flex">
          Schemes, Managers and Requests
        </h1>
      </div>
      <div className="flex justify-center items-center mt-4">
        <h1 className="text-xl font-semibold text-gray-800 flex">
          Manage the schemes, managers and requests
        </h1>
      </div>
      <main className="flex-grow p-6">
        <div className="grid grid-cols-4 gap-6 h-44">
          {/* Schemas */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow hover:bg-blue-600 cursor-pointer">
            <div className="flex items-center">
              <FaSitemap className="text-7xl mr-4  my-7" />
              <div>
                <h2 className="text-lg font-bold">Schemas</h2>
                <p>Manage schemas</p>
              </div>
            </div>
          </div>

          {/* Requests */}
          <div className="bg-blue-700 text-white p-6 rounded-lg shadow hover:bg-blue-800 cursor-pointer">
            <div className="flex items-center">
              <FaEnvelopeOpenText className="text-7xl mr-4  my-7" />
              <div>
                <h2 className="text-lg font-bold">Requests</h2>
                <p>Manage interns request</p>
              </div>
            </div>
          </div>

          {/* Institutes */}
          <div className="bg-blue-800 text-white p-6 rounded-lg shadow hover:bg-blue-900 cursor-pointer">
            <div className="flex items-center">
              <FaUniversity className="text-7xl mr-4  my-7" />
              <div>
                <h2 className="text-lg font-bold">Institutes</h2>
                <p>Manage Institute</p>
              </div>
            </div>
          </div>

          {/* Rotation */}
          <div className="bg-blue-900 text-white p-6 rounded-lg shadow hover:bg-blue-950 cursor-pointer">
            <div className="flex items-center">
              <FaSyncAlt className="text-7xl mr-4  my-7" />
              <div>
                <h2 className="text-lg font-bold">Rotation</h2>
                <p>Interns under rotation</p>
              </div>
            </div>
          </div>
        </div>




          
        </main>
        <Footer />

      </div>
    </>
  );
};

export default adminManagementSystem;
