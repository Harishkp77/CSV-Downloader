import React, { useEffect, useState } from "react";
import axios from "axios";
import "../EmployeeTable.css";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [noResultsFound, setNoResultsFound] = useState(false); 

  //endpoint api for view employee table request
  useEffect(() => {
    axios
      .get("http://localhost:3001/getEmployees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  
  //handle search api
  const handleSearch = () => {
    const filteredData = employees.filter((employee) => {
      return (
        employee.employeeId.toString().includes(searchTerm) ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredEmployees(filteredData);
    setNoResultsFound(filteredData.length === 0);
  };

  //handle reload the page api
  const handleRefresh = () => {
    window.location.reload();
  };

  // handle to download csv file
  const handleCSVDownload = () => {
    axios
      .get("http://localhost:3001/downloadCsv", {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "employee_data.csv";

        a.click();

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
      });
  };
  // handle delete the employee from the table
  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:3001/deleteEmployee/${employeeId}`)
        .then(() => {
          setEmployees((prevEmployees) =>
            prevEmployees.filter(
              (employee) => employee.employeeId !== employeeId
            )
          );
          setFilteredEmployees((prevFilteredEmployees) =>
            prevFilteredEmployees.filter(
              (employee) => employee.employeeId !== employeeId
            )
          );
          alert("Employee deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  // handle edit option to show
  const handleEditEmployee = (employee) => {
      console.log("Edit button clicked");
    setEditingEmployee({ ...employee });
  };

  //handle to check the date of birth should not be updated

  const handleSaveEmployee = () => {
    const { formattedDob, ...employeeWithoutFormattedDob } = editingEmployee;
    updateEmployee(employeeWithoutFormattedDob);
    setEditingEmployee(null);
  };

  //handle revert back from edit option
  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  // if the input field value changed the state will updated hear
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee({
      ...editingEmployee,
      [name]: value,
    });
  };

  //  handle update via edit option
  const updateEmployee = (updatedEmployee) => {
    axios
      .put(
        `http://localhost:3001/updateEmployee/${updatedEmployee.employeeId}`,
        updatedEmployee
      )
      .then((response) => {
        console.log("Employee updated successfully", response.data);
      })
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.employeeId === updatedEmployee.employeeId
              ? updatedEmployee
              : employee
          )
        );
        setEditingEmployee(null);
        alert("Employee updated successfully.");
      })
      .then(useEffect)
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="container mt-2">
      <h3>Employee Table</h3>
      <div className="search-container mt-2">
        <input
          type="text"
          placeholder="Search by ID or First Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "200px",
            padding: "5px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 10px",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Search
        </button>
        <button
          onClick={handleRefresh}
          style={{
            padding: "8px 10px",
            borderRadius: "4px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            marginLeft: "10px",
          }}
        >
          Refresh
        </button>

        <button
          onClick={handleCSVDownload}
          style={{
            padding: "8px 10px",
            borderRadius: "4px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            marginLeft: "10px",
          }}
        >
          CSV Download
        </button>
      </div>
      {noResultsFound && (
        <div style={{ color: "red", marginTop: "10px" }}>
          No results found.
        </div>
      )}
      <div
        className="table-responsive mt-2"
        style={{
          maxHeight: "520px",
          maxWidth: "100%",
          overflowY: "auto",
          marginBottom: "0",
        }}
      >
        <table
          className="table table-striped table-bordered table-hover"
          style={{ fontSize: "12px",background: "#f2f2f2" }}
        >
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Marital Status</th>
              <th>Phone Number</th>
              <th>Emergency Contact Number</th>
              <th>Email ID</th>
              <th>Address1</th>
              <th>Address2</th>
              <th>Address3</th>
              <th>PostalCode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0
              ? filteredEmployees.slice(0, 30).map((employee) => (
                  <tr key={employee.employeeId}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.formattedDob}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.maritalStatus}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.emergencyContact}</td>
                    <td>{employee.email}</td>
                    <td>{employee.addressLine1}</td>
                    <td>{employee.addressLine2}</td>
                    <td>{employee.addressLine3}</td>
                    <td>{employee.postalCode}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleDeleteEmployee(employee.employeeId)
                        }
                        className="delete-button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              : employees.slice(0, 30).map((employee) => (
                  <tr key={employee.employeeId}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.formattedDob}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.maritalStatus}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.emergencyContact}</td>
                    <td>{employee.email}</td>
                    <td>{employee.addressLine1}</td>
                    <td>{employee.addressLine2}</td>
                    <td>{employee.addressLine3}</td>
                    <td>{employee.postalCode}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleDeleteEmployee(employee.employeeId)
                        }
                        className="delete-button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {editingEmployee && (
  <div className="custom-modal">
    <div className="custom-modal-dialog">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h4 className="custom-modal-title">Edit Employee</h4>
        </div>
        <div className="custom-modal-body">
          <form>
            <div className="field-group">
              <div className="custom-form-group">
                <label htmlFor="firstName" className="custom-form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="firstName"
                  name="firstName"
                  value={editingEmployee.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-form-group">
                <label htmlFor="lastName" className="custom-form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="lastName"
                  name="lastName"
                  value={editingEmployee.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-form-group">
                <label htmlFor="gender" className="custom-form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="gender"
                  name="gender"
                  value={editingEmployee.gender}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field-group">
              <div className="custom-form-group">
                <label htmlFor="maritalStatus" className="custom-form-label">
                  Marital Status
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="maritalStatus"
                  name="maritalStatus"
                  value={editingEmployee.maritalStatus}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-form-group">
                <label htmlFor="phoneNumber" className="custom-form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editingEmployee.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-form-group">
                <label htmlFor="emergencyContact" className="custom-form-label">
                  Emergency Contact Number
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={editingEmployee.emergencyContact}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field-group">
              <div className="custom-form-group">
                <label htmlFor="email" className="custom-form-label">
                  Email ID
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="email"
                  name="email"
                  value={editingEmployee.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-form-group">
                <label htmlFor="addressLine1" className="custom-form-label">
                  Address Line 1
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="addressLine1"
                  name="addressLine1"
                  value={editingEmployee.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-form-group">
                <label htmlFor="addressLine2" className="custom-form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="addressLine2"
                  name="addressLine2"
                  value={editingEmployee.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field-group">
              <div className="custom-form-group">
                <label htmlFor="addressLine3" className="custom-form-label">
                  Address Line 3
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="addressLine3"
                  name="addressLine3"
                  value={editingEmployee.addressLine3}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-form-group">
                <label htmlFor="postalCode" className="custom-form-label">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="custom-form-control"
                  id="postalCode"
                  name="postalCode"
                  value={editingEmployee.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="custom-form-group">
              <button
                onClick={handleSaveEmployee}
                className="custom-btn custom-btn-primary"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="custom-btn custom-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
export default EmployeeTable;
