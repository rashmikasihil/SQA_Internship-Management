import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import '../src/index.css';
import InternshipManagement from './pages/Dashboards/InternshipManagement';
import InternRegistration from './pages/InternRegistration';
import InstituteRegistration from './pages/InstituteRegistration';
import AdminManagementSystem from './pages/Dashboards/adminManagement';
import StartupPage from './StartupPage';
import RegistrationPage from './pages/RegistrationPage';
import InterviewAdd from './pages/Interview/InterviewAdd';
import AddNewCv from './pages/CV/AddnewCv';
import ViewApprovedCVs from './pages/CV/ViewApprovedcv';
import Sidebar from './components/Sidebar'; 

import AddNewInduction from './pages/Inductions/AddNewInduction';
import LifeCycle from './pages/LifeCycle/LifeCycle';
import ViewAllInterview from './pages/Interview/ViewAllInterview';
import AddInstituteForm from './pages/Institute/AddInstituteForm';
import InternStatus from './pages/InternStatuss/InternStatus'
import ViewTobeApprovedCVs from './pages/CV/ApproveCVs';
import InstitutionRequests from './pages/Institute/InstitutionRequests';
import AddInstitutionRequests from './pages/Institute/AddInstitutionRequests';
import ViewInterview from './pages/Interview/ViewInterview';
import InterviewList from './pages/Interview/InterviewList';
import InterviewDetails from './pages/Interview/InterviewDetails';
import ViewAllInduction from './pages/Inductions/ViewAllInductions'
import AddnewCvByintern from './pages/CV/AddnewcvByinter';


import AdminLogin from './pages/adminlogin'


// Wrapper component for handling sidebar logic
const AppWithSidebar = ({ children }) => {
  const location = useLocation();

  // Define paths where the sidebar should be shown
  const showSidebarPaths = [
   
    '/admin-dashboard',
    '/interview-add',
    '/add-new-cv',
    '/view-approved-cvs',
    '/add-new-induction',
    '/view-all-interview',
    '/add-institute',
    '/intern-status',
    '/view-tobe-approved-cvs',
    '/view-interview',
    '/interview-list',
    '/view-all-induction'

  ];

  // Check if the current path matches the ones for displaying the sidebar
  const showSidebar = showSidebarPaths.includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {showSidebar && <Sidebar />} {/* Render Sidebar conditionally */}
      <div style={{ flex: 1 }}>{children}</div> {/* Main content area */}
    </div>
  );
};






function App() {
  return (
    <Router>
      <AppWithSidebar>
        
        <Routes>
          <Route path="/" element={<StartupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/admin-login' element={<AdminLogin/>}/>
          {/* dashboard */}
          <Route path="/intern-management" element={<InternshipManagement />} />
          <Route path="/admin-dashboard" element={<AdminManagementSystem />} />

          {/* REGISTER */}
          <Route path="/intern-register" element={<InternRegistration />} />
          <Route path="/institute-register" element={<InstituteRegistration />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* INTERVIEW */}
          <Route path="/interview-add" element={<InterviewAdd />} />
          <Route path="/view-all-interview" element={<ViewAllInterview />} />
          <Route path='/view-interview' element={<ViewInterview/>}/>
          <Route path='/interview-list' element={<InterviewList/>}/>
          <Route path="/interviews/:id" element={<InterviewDetails />} />


          {/* CV */}
          <Route path="/add-new-cv" element={<AddNewCv />} />
          <Route path="/view-approved-cvs" element={<ViewApprovedCVs />} />
          <Route path="/view-tobe-approved-cvs" element={<ViewTobeApprovedCVs />} />
          <Route path="/add-new-cv-by-intern" element={<AddnewCvByintern />} />
          
          {/* LIFE CYCLE */}
          <Route path="/life-cycle" element={<LifeCycle />} />
          <Route path='/intern-status' element={<InternStatus/>} />

          {/* INDUCTION */}
          <Route path="/add-new-induction" element={<AddNewInduction />} />
          <Route path="/view-all-induction" element={<ViewAllInduction />} />
          
          {/* INSTITUTE */}
          <Route path="/add-institute" element={<AddInstituteForm/>} />

          <Route path="/institution-requests" element={<InstitutionRequests />} />
          <Route path="/add-institution-requests" element={<AddInstitutionRequests />} />
 
          
        </Routes>

        <Routes>
          </Routes>
        
      </AppWithSidebar>
      
    </Router>
  );
}

export default App;
