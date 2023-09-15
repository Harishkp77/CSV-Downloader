import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/employee-details" element={<EmployeeDetails />} />
          <Route path="/employee-table" element={<EmployeeTable />} />
          <Route path="/" element={<Navigate to="/employee-details" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
