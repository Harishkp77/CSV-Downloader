import React, { useState } from "react";
import "../EmployeeTable.css";

function EmployeeDetails() {
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    phoneNumber: "",
    emergencyContact: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    postalCode: "",
  });
// handle message for status updated
  const [message, setMessage] = useState("");

// if the input field change the values will update into state  using name attribute
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  // handle submit to save the employee data 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // api end point from client side 
      const response = await fetch("http://localhost:3001/saveEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });
      if (response.ok) {
        setMessage("Employee data saved successfully");
        console.log("Employee data saved successfully:", employeeData);
        setEmployeeData({
          employeeId: "",
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          maritalStatus: "",
          phoneNumber: "",
          emergencyContact: "",
          email: "",
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          postalCode: "",
        });
      } else {
        const responseData = await response.json();
        if (
          response.status === 400 &&
          responseData.error === "Employee ID already exists"
        ) {
          setMessage("Employee ID already exists");
        } else {
          setMessage("Failed to save employee data.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4 employee-form-container">
      <h2>Employee Details</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              className="form-control"
              id="employeeId"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={employeeData.dob}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="Male"
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="Female"
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="other"
                  value="Other"
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="maritalStatus">Marital Status</label>
            <select
              className="form-control"
              id="maritalStatus"
              name="maritalStatus"
              value={employeeData.maritalStatus}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={employeeData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="emergencyContact">Emergency Contact Number</label>
            <input
              type="tel"
              className="form-control"
              id="emergencyContact"
              name="emergencyContact"
              value={employeeData.emergencyContact}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="email">Email (Mail ID)</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="addressLine1">
              Address Door No/Apartment/House Name
            </label>
            <input
              type="text"
              className="form-control"
              id="addressLine1"
              name="addressLine1"
              value={employeeData.addressLine1}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="addressLine2">Address Street/Area </label>
            <input
              type="text"
              className="form-control"
              id="addressLine2"
              name="addressLine2"
              value={employeeData.addressLine2}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="addressLine3">Address City</label>
            <input
              type="text"
              className="form-control"
              id="addressLine3"
              name="addressLine3"
              value={employeeData.addressLine3}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              name="postalCode"
              value={employeeData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>
      {message && <div className="alert alert-success">{message}</div>}
    </div>
  );
}

export default EmployeeDetails;
