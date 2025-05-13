import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import InstitutionRequests from "../pages/InstitutionRequests";
import AddInstitutionRequest from './components/AddInstitutionRequest'; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/institution-requests" element={<InstitutionRequests />} />
        <Route path="/add-institution-requests" element={<AddInstitutionRequest />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
