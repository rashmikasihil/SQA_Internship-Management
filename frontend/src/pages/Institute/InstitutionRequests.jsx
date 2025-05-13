import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const InstitutionRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('institutionRequests')) || [];
    setRequests(storedRequests);
  }, []);
          
  const handleDelete = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
    localStorage.setItem('institutionRequests', JSON.stringify(updatedRequests));
  };

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <header className="header">
          <span>Welcome Admin</span>
        </header>
        <section className="content">
          <h1>All Institute Registration Requests</h1>

          {/* Add the link here */}
          <NavLink to="/add-institution-requests" className="add-request-link">
            Add New Institution Request
          </NavLink>

          <input
            type="text"
            placeholder="Type to filter column..."
            className="filter-input"
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>Request No</th>
                <th>Institute Name</th>
                <th>Email</th>
                <th>Department/Faculty</th>
                <th>Address</th>
                <th>Institute Type</th>
                <th>Contact with</th>
                <th>Contact No</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.requestNo}</td>
                    <td>{request.instName}</td>
                    <td>{request.email}</td>
                    <td>{request.department}</td>
                    <td>{request.address}</td>
                    <td>{request.instituteType}</td>
                    <td>{request.contactWith}</td>
                    <td>{request.contactNo}</td>
                    <td><button>View</button></td>
                    <td><button onClick={() => handleDelete(index)}>Delete</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No data to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="total-count">{requests.length} total</div>
        </section>
      </main>
    </div>
  );
};

export default InstitutionRequests;
