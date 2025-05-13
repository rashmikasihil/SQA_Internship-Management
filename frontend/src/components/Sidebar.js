import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsFillPatchExclamationFill, BsPersonVideo3 } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { RiCompassFill } from "react-icons/ri";
import { SiMlflow } from "react-icons/si";
import { MdMoveToInbox } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { BiSolidInstitution } from "react-icons/bi";
import { MdOutlinePendingActions } from "react-icons/md";
import { RxComponentPlaceholder } from "react-icons/rx";
import { MdMotionPhotosOn } from "react-icons/md";
import SLT from "../assets/SLT.png";
import { TiThSmall } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import { MdAssignmentTurnedIn } from "react-icons/md";

const Sidebar = () => {
  // State for managing submenu visibility
  const [isInteOpen, setIsInteOpen] = useState(false);
  const [isInductionOpen, setIsInductionOpen] = useState(false);
  const [isManageCvOpen, setIsManageCvOpen] = useState(false);

  const toggleInterviews = () => {
    setIsInteOpen(!isInteOpen);
  };

  const toggleInduction = () => { 
    setIsInductionOpen(!isInductionOpen);
  };

  const toggleManageCv = () => {
    setIsManageCvOpen(!isManageCvOpen);
  };



  return (
    <div className="max-h-fit bg-gray-900 text-gray-300 w-64">
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
              href="/admin-dashboard"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <FaHome />
              <span>Home</span>
            </a>
          </li>

          <li>
            <button
              onClick={toggleManageCv}
              className="flex items-center justify-between w-full text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <FiUsers />
                <span>Manage CV</span>
              </div>
              <IoChevronForwardCircleOutline className={`fas fa-chevron-${isManageCvOpen ? "down" : "right"
                }`} />

            </button>
            {isManageCvOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>

                  <a
                    href="/view-approved-cvs"

                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  ><TiThSmall />
                    <span>View All CVs</span>

                  </a>
                </li>
                <li>
                  <a
                    href="/add-new-cv"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  ><IoIosAddCircle />
                    <span>Add New CVs</span>

                  </a>
                </li>
                <li>
                  <a
                    href="/view-tobe-approved-cvs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  ><IoIosAddCircle />
                    <span>Approve CV</span>

                  </a>
                </li>

              </ul>
            )}
          </li>


          <li>
            <a
              href="/intern-status"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <BsFillPatchExclamationFill />
              <span>Intern Status</span>
            </a>
          </li>
         

          <li>
            <button
              onClick={toggleInterviews}
              className="flex items-center justify-between w-full text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <div className="flex items-center space-x-3">
              <BsPersonVideo3 />
              <span>Interviews</span>
              </div>
              <IoChevronForwardCircleOutline className={`fas fa-chevron-${isInteOpen ? "down" : "right"
                }`} />

            </button>
            {isInteOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>

                  <a
                    href="/interview-list"

                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  ><TiThSmall />
                    <span>View All Interviews</span>

                  </a>
                </li>
                <li>
                  <a
                    href="/interview-add"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  ><IoIosAddCircle />
                    <span>Add New Interview</span>

                  </a>
                </li>
                <li>

<a
  href="/view-interview"

  className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
><TiThSmall />
  <span>Schedule now</span>

</a>
</li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="/interviews"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <SlCalender />
              <span>Assign to schemes</span>
            </a>
          </li>

          {/* Expandable Menu */}
          <li>
            <button
              onClick={toggleInduction}
              className="flex items-center justify-between w-full text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <MdOutlineMessage />
                <span>Induction</span>
              </div>
              <IoChevronForwardCircleOutline className={`fas fa-chevron-${isInductionOpen ? "down" : "right"
                }`} />

            </button>
            {isInductionOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>
                  <a
                    href="/view-all-induction"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  >
                   < TiThSmall />
                   <span> View All Inductions</span>
                   
                  </a>
                </li>
                <li>
                  <a
                    href="/add-new-induction"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  >
                    <MdAssignmentTurnedIn />
                    <span>Assign Interns</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Other Static Menu Items */}
          <li>
            <a
              href="/life-cycle"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <RiCompassFill />
              <span>life cycle</span>
            </a>
          </li>
          <li>
            <a
              href="/rotational"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <SiMlflow />
              <span>Schemes</span>
            </a>
          </li>
          <li>
            <a
              href="/rotational"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <MdMoveToInbox />
              <span>Requests</span>
            </a>
          </li>
          <li>
            <a
              href="/rotational"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <PiCertificateFill />
              <span>certificate Requests</span>
            </a>
          </li>
         
          <li>
            <button
              onClick={toggleInduction}
              className="flex items-center justify-between w-full text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <div className="flex items-center space-x-3">
              <BiSolidInstitution />
                <span>Manage Institute</span>
              </div>
              <IoChevronForwardCircleOutline className={`fas fa-chevron-${isInductionOpen ? "down" : "right"
                }`} />

            </button>
            {isInductionOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>
                  <a
                    href="/registration-requests"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  >
                   <MdAssignmentTurnedIn />
                   <span> Add New Institute</span>
                   
                  </a>
                </li>
                {/* <li>
                  <a
                    href="/add-new-induction"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center space-x-3"
                  >
                    
                    <span>Assign Interns</span>
                  </a>
                </li> */}
              </ul>
            )}
          </li>




          <li>
            <a
              href="/rotational"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <MdOutlinePendingActions />
              <span>My interns pending</span>
            </a>
          </li>
          <li>
            <a
              href="/rotational"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >

              <RxComponentPlaceholder />
              <span>My interns placement</span>
            </a>
          </li>
          <li>
            <a
              href="/rotational"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <MdMotionPhotosOn />

              <span>Rotational</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
