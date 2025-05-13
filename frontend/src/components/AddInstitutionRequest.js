import React, { useState } from 'react';

const AddInstitutionRequests = () => {
  const [newRequest, setNewRequest] = useState({
    requestNo: '',
    instName: '',
    email: '',
    department: '',
    address: '',
    instituteType: '',
    contactWith: '',
    contactNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedRequests = JSON.parse(localStorage.getItem('institutionRequests')) || [];
    storedRequests.push(newRequest);
    localStorage.setItem('institutionRequests', JSON.stringify(storedRequests));
    // Optionally clear form or redirect
    alert('Request added successfully');
  };

  return (
    <div className="add-request-form">
      <h1>Add New Institution Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Request No:
          <input
            type="text"
            name="requestNo"
            value={newRequest.requestNo}
            onChange={handleChange}
          />
        </label>
        <label>
          Institute Name:
          <input
            type="text"
            name="instName"
            value={newRequest.instName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newRequest.email}
            onChange={handleChange}
          />
        </label>
        {/* Add more fields as needed */}
        <button type="submit">Add Request</button>
      </form>
    </div>
  );
};

export default AddInstitutionRequests;
