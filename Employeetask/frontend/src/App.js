import React, { useState } from "react";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);

  const toggleEmployeeTable = () => {
    setShowEmployeeTable(!showEmployeeTable);
  };

  return (
    <div>
      <button
        onClick={toggleEmployeeTable}
        style={{
          position: "absolute",
          top: "26px",
          right: "40px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: showEmployeeTable ? "#28a745" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        {showEmployeeTable ? "Add Employee" : "View Employee"}
      </button>

      {showEmployeeTable ? <EmployeeTable /> : <EmployeeDetails />}
    </div>
  );
}

export default App;
