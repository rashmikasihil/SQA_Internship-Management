import React from "react";
import SLT from "../assets/SLT.png";
import { FaHome } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";



const UserSidebar = () => {



  return (
    <div
    className="h-screen bg-gray-900 text-gray-300 w-64"
    style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      
    }}
  >
      {/* Header */}
      <div className="flex items-center justify-center py-1">
        <div className="text-center">
          < img src={SLT} alt="SLT" className="w-40 h-40 justify-center flex" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 mt-0">
        <ul className="space-y-2">
          {/* Static Menu Items */}

        

          <li>
            <a
              href="/interviews"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <FaHome/>
              
              <span>Home</span>
            </a>
          </li>

          {/* Expandable Menu */}
          

          {/* Other Static Menu Items */}
          <li>
            <a
              href="/intern-management"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <BsBank />
              <span>Bank details</span>
            </a>
          </li>
          <li>
            <a
              href="/intern-management"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
             <MdLiveHelp />
              <span>Help</span>
            </a>
          </li>
               
          
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;
