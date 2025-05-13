import React, { useState } from 'react';

const AddInstitutionRequests = () => {
  const [formData, setFormData] = useState({
    requestNo: '',
    instName: '',
    email: '',
    department: '',
    address: '',
    instituteType: '',
    contactWith: '',
    contactNo: '',
  });

  // Handle input change
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Getting previous requests from localStorage or initializing an empty array if none exist
    const storedRequests = JSON.parse(localStorage.getItem('institutionRequests')) || [];

    // Add new request to the stored requests
    storedRequests.push(formData);

    // Save updated requests back to localStorage
    localStorage.setItem('institutionRequests', JSON.stringify(storedRequests));

    // Reset form data
    setFormData({
      requestNo: '',
      instName: '',
      email: '',
      department: '',
      address: '',
      instituteType: '',
      contactWith: '',
      contactNo: '',
    });

    // Optionally, show a success message
    alert('Institution Request Added Successfully!');
  };

  return (
    <div className="form-container">
      <main className="form-main">
        <header className="form-header">
          <h1>Add New Institution Request</h1>
        </header>
        <section className="form-content">
          <form onSubmit={handleSubmit} className="institution-form">
            <div className="form-group">
              <label htmlFor="requestNo">Request No</label>
              <input
                type="text"
                name="requestNo"
                id="requestNo"
                value={formData.requestNo}
                onChange={handleChange}
                required
                placeholder="Enter Request Number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instName">Institute Name</label>
              <input
                type="text"
                name="instName"
                id="instName"
                value={formData.instName}
                onChange={handleChange}
                required
                placeholder="Enter Institute Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department/Faculty</label>
              <input
                type="text"
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="Enter Department or Faculty"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter Address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instituteType">Institute Type</label>
              <input
                type="text"
                name="instituteType"
                id="instituteType"
                value={formData.instituteType}
                onChange={handleChange}
                required
                placeholder="Enter Institute Type"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactWith">Contact with</label>
              <input
                type="text"
                name="contactWith"
                id="contactWith"
                value={formData.contactWith}
                onChange={handleChange}
                required
                placeholder="Enter Contact Person"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNo">Contact No</label>
              <input
                type="text"
                name="contactNo"
                id="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                placeholder="Enter Contact Number"
              />
            </div>

            <button type="submit" className="submit-button">Submit Request</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddInstitutionRequests;
