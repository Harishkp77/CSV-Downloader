const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const fastcsv = require("fast-csv");
const { format } = require("date-fns");

const port = 3001;

// Create a mysql connection string

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee",
});

// cors for using express js framework
app.use(cors());

// Parse JSON body handle
app.use(bodyParser.json());

// Connect to the MySQL database if not show  error in console
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL database");
});

// sending data from client to mysql database table employees
app.post("/saveEmployee", (req, res) => {
  const employeeData = req.body;

  // Format the date of birth (dob) before inserting it into the database
  employeeData.dob = format(new Date(employeeData.dob), "yyyy-MM-dd"); // Use 'yyyy-MM-dd' format

  const sql = "INSERT INTO employees SET ?";

  connection.query(sql, employeeData, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        // Handling duplicate id error
        res.status(400).json({ error: "Employee ID already exists" });
      } else {
        console.error("Error inserting employee data:", err);
        res.status(500).json({ error: "Error inserting employee data" });
      }
    } else {
      console.log("Employee data inserted:", result);
      res.status(201).json({ message: "Employee data inserted" });
    }
  });
});

//displaying table to client
app.get("/getEmployees", (req, res) => {
  connection.query(
    "SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as formattedDob FROM employees ORDER BY employeeId DESC;",
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Error fetching employee data" });
        return;
      }
      res.json(results);
    }
  );
});

// Search employees based on a search term (employeeId or firstName) with exact matching
app.get("/searchEmployees", (req, res) => {
  const searchTerm = req.query.term;

  // Validate the search term to ensure it's safe to use in the query
  if (!searchTerm || typeof searchTerm !== "string") {
    res.status(400).json({ error: "Invalid search term" });
    return;
  }

  // Use a parameterized query with exact matching to prevent SQL injection
  connection.query(
    'SELECT *, DATE_FORMAT(dob, "%Y-%m-%d") AS formattedDob FROM employees WHERE employeeId = ? OR firstName = ?',
    [searchTerm, searchTerm],
    (err, results) => {
      if (err) {
        console.error("Error querying the database for search:", err);
        res.status(500).json({ error: "Error searching for employees" });
        return;
      }

      if (results.length === 0) {
        // No results found, send an error message
        res.status(404).json({ error: "No data found" });
      } else {
        // Results found, send the data
        res.json(results);
      }
    }
  );
});

// handle to download employee data as CSV

app.get("/downloadCsv", (req, res) => {
  connection.query(
    "SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as formattedDob FROM employees ORDER BY employeeId DESC;",
    (err, results) => {
      if (err) {
        console.error("Error querying the database for CSV download:", err);
        res.status(500).json({ error: "Error fetching employee data" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "No data found for CSV download" });
        return;
      }

      const csvData = [];
      csvData.push([
        "Employee ID",
        "First Name",
        "Last Name",
        "Date of Birth",
        "Gender",
        "Marital Status",
        "Phone Number",
        "Emergency Contact Number",
        "Email ID",
        "Address1",
        "Address2",
        "Address3",
        "PostalCode",
      ]);

      results.forEach((employee) => {
        csvData.push([
          employee.employeeId,
          employee.firstName,
          employee.lastName,
          employee.formattedDob,
          employee.gender,
          employee.maritalStatus,
          employee.phoneNumber,
          employee.emergencyContact,
          employee.email,
          employee.addressLine1,
          employee.addressLine2,
          employee.addressLine3,
          employee.postalCode,
        ]);
      });

      const csvStream = fastcsv.writeToStream(
        fs.createWriteStream("employee_data.csv"),
        csvData,
        {
          headers: true,
        }
      );

      csvStream.on("finish", () => {
        // Send the CSV file as a response
        res.download("employee_data.csv", "employee_data.csv", (err) => {
          if (err) {
            console.error("Error sending CSV file:", err);
            res.status(500).json({ error: "Error sending CSV file" });
          } else {
            console.log("CSV file sent successfully");
          }
        });
      });
    }
  );
});

// handle  to fetch employee data by ID for editing
app.get("/editEmployee/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  const sql = "SELECT * FROM employees WHERE employeeId = ?";

  connection.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Error querying the database for edit:", err);
      res
        .status(500)
        .json({ error: "Error fetching employee data for editing" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json(result[0]);
    }
  });
});

// Update an employee's information
app.put("/updateEmployee/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  const updatedEmployee = req.body;

  // Remove formattedDob (if it's present) from the updatedEmployee object
  delete updatedEmployee.formattedDob; // This line removes formattedDob

  const sql = "UPDATE employees SET ? WHERE employeeId = ?";
  console.log(updatedEmployee);

  connection.query(sql, [updatedEmployee, employeeId], (err, result) => {
    if (err) {
      console.error("Error updating employee:", err);
      res.status(500).json({ error: "Error updating employee" });
      return;
    }

    res.status(200).json({ message: "Employee updated successfully" });
  });
});

// Delete the employee from the database

app.delete("/deleteEmployee/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  const sql = "DELETE FROM employees WHERE employeeId = ?";

  connection.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      res.status(500).json({ error: "Error deleting employee" });
      return;
    }

    res.status(204).end(); // Respond with a 204 No Content status if the deletion is successful
  });
});

// check the server is running

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
