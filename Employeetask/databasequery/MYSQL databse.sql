create database employee;

use employee;
CREATE TABLE employees (
  employeeId INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  gender VARCHAR(255),
  maritalStatus VARCHAR(255),
  phoneNumber VARCHAR(255),
  emergencyContact VARCHAR(255),
  email VARCHAR(255),
  addressLine1 VARCHAR(255),
  addressLine2 VARCHAR(255),
  addressLine3 VARCHAR(255),
  postalCode VARCHAR(255)
);

INSERT INTO employees (employeeId, firstName, lastName, dob, gender, maritalStatus, phoneNumber, emergencyContact, email, addressLine1, addressLine2, addressLine3, postalCode)
VALUES
  (1001, 'John', 'Doe', '1990-05-15', 'Male', 'Single', '555-123-4567', 'Jane Doe', 'john.doe@email.com', '123 Main St', 'Apt 4B', 'Springfield', '12345'),
  (1002, 'Jane', 'Smith', '1985-08-22', 'Female', 'Married', '555-987-6543', 'John Smith', 'jane.smith@email.com', '456 Elm St', 'Apt 7C', 'Riverside', '54321'),
  (1003, 'Michael', 'Johnson', '1988-03-10', 'Male', 'Single', '555-234-5678', 'Mary Johnson', 'michael.johnson@email.com', '789 Oak St', 'Unit 2', 'Maplewood', '67890'),
  (1004, 'Emily', 'Brown', '1993-11-18', 'Female', 'Married', '555-345-6789', 'David Brown', 'emily.brown@email.com', '101 Pine St', '', 'Hillside', '45678'),
  (1005, 'David', 'Wilson', '1980-09-05', 'Male', 'Divorced', '555-876-5432', 'Sarah Wilson', 'david.wilson@email.com', '555 Cedar Ln', 'Suite 3A', 'Meadowville', '56789'),
  (1006, 'Sarah', 'Lee', '1982-06-30', 'Female', 'Single', '555-765-4321', 'Tom Lee', 'sarah.lee@email.com', '222 Birch Rd', 'Apt 5D', 'Hillsborough', '98765'),
  (1007, 'James', 'Martinez', '1995-02-08', 'Male', 'Married', '555-432-1098', 'Linda Martinez', 'james.martinez@email.com', '777 Oak St', 'Unit 9', 'Riverside', '34567'),
  (1008, 'Linda', 'Garcia', '1990-07-14', 'Female', 'Single', '555-321-0987', 'James Garcia', 'linda.garcia@email.com', '444 Pine Ln', 'Apt 2C', 'Meadowville', '12345'),
  (1009, 'William', 'Anderson', '1987-12-25', 'Male', 'Married', '555-210-9876', 'Maria Anderson', 'william.anderson@email.com', '888 Elm Rd', '', 'Springfield', '23456'),
  (1010, 'Maria', 'Rodriguez', '1991-04-03', 'Female', 'Single', '555-109-8765', 'William Rodriguez', 'maria.rodriguez@email.com', '999 Birch St', 'Suite 6E', 'Hillside', '56789'),
  (1011, 'Robert', 'Gonzalez', '1983-10-12', 'Male', 'Married', '555-987-6543', 'Jessica Gonzalez', 'robert.gonzalez@email.com', '111 Cedar Rd', 'Apt 4D', 'Maplewood', '45678'),
  (1012, 'Jessica', 'Taylor', '1989-01-28', 'Female', 'Single', '555-876-5432', 'Robert Taylor', 'jessica.taylor@email.com', '333 Pine St', '', 'Hillsborough', '23456'),
  (1013, 'Richard', 'Brown', '1994-07-07', 'Male', 'Divorced', '555-765-4321', 'Jennifer Brown', 'richard.brown@email.com', '444 Oak Rd', 'Unit 8', 'Riverside', '78901'),
  (1014, 'Jennifer', 'Hernandez', '1986-09-20', 'Female', 'Single', '555-654-3210', 'Richard Hernandez', 'jennifer.hernandez@email.com', '555 Cedar St', 'Apt 3B', 'Meadowville', '12345'),
  (1015, 'John', 'Smith', '1992-02-14', 'Male', 'Married', '555-543-2109', 'Emily Smith', 'john.smith@email.com', '777 Elm Rd', 'Suite 7F', 'Springfield', '34567'),
  (1016, 'Emily', 'Davis', '1984-06-01', 'Female', 'Single', '555-432-1098', 'John Davis', 'emily.davis@email.com', '888 Birch St', '', 'Hillside', '56789'),
  (1017, 'Daniel', 'Johnson', '1981-03-09', 'Male', 'Widowed', '555-321-0987', 'Susan Johnson', 'daniel.johnson@email.com', '101 Oak Ln', 'Apt 1A', 'Maplewood', '98765'),
  (1018, 'Susan', 'Wang', '1990-08-17', 'Female', 'Single', '555-210-9876', 'Daniel Wang', 'susan.wang@email.com', '222 Cedar Rd', 'Apt 5E', 'Riverside', '45678'),
  (1019, 'Matthew', 'Lee', '1988-12-04', 'Male', 'Married', '555-109-8765', 'Melissa Lee', 'matthew.lee@email.com', '333 Pine St', '', 'Meadowville', '12345'),
  (1020, 'Melissa', 'Smith', '1987-01-30', 'Female', 'Single', '555-987-6543', 'Matthew Smith', 'melissa.smith@email.com', '555 Elm Rd', 'Suite 2B', 'Hillsborough', '23456'),
  (1021, 'Christopher', 'Garcia', '1993-05-27', 'Male', 'Married', '555-876-5432', 'Amy Garcia', 'christopher.garcia@email.com', '666 Oak St', 'Unit 4C', 'Riverside', '78901'),
  (1022, 'Amy', 'Chen', '1982-11-08', 'Female', 'Single', '555-765-4321', 'Christopher Chen', 'amy.chen@email.com', '777 Pine Rd', '', 'Springfield', '34567'),
  (1023, 'Daniel', 'Davis', '1989-03-15', 'Male', 'Single', '555-654-3210', 'Emily Davis', 'daniel.davis@email.com', '888 Cedar Ln', 'Apt 6D', 'Maplewood', '56789'),
  (1024, 'Emily', 'Martinez', '1991-07-22', 'Female', 'Married', '555-543-2109', 'Daniel Martinez', 'emily.martinez@email.com', '999 Birch St', 'Suite 8F', 'Hillside', '12345'),
  (1025, 'Matthew', 'Thompson', '1983-09-09', 'Male', 'Single', '555-432-1098', 'Sarah Thompson', 'matthew.thompson@email.com', '111 Oak St', 'Apt 7A', 'Meadowville', '23456'),
  (1026, 'Sarah', 'Jones', '1986-11-02', 'Female', 'Married', '555-321-0987', 'Matthew Jones', 'sarah.jones@email.com', '222 Pine Rd', '', 'Riverside', '34567'),
  (1027, 'David', 'Lopez', '1994-12-12', 'Male', 'Single', '555-210-9876', 'Maria Lopez', 'david.lopez@email.com', '333 Elm St', 'Unit 3B', 'Springfield', '78901'),
  (1028, 'Maria', 'Wilson', '1990-04-14', 'Female', 'Married', '555-109-8765', 'David Wilson', 'maria.wilson@email.com', '444 Birch Rd', 'Apt 5E', 'Hillside', '12345'),
  (1029, 'James', 'Harris', '1988-07-19', 'Male', 'Divorced', '555-987-6543', 'Laura Harris', 'james.harris@email.com', '555 Pine Ln', '', 'Maplewood', '23456'),
  (1030, 'Laura', 'Smith', '1982-10-25', 'Female', 'Single', '555-876-5432', 'James Smith', 'laura.smith@email.com', '777 Cedar St', 'Suite 4C', 'Meadowville', '56789'),
  (1031, 'Robert', 'Gonzalez', '1991-01-07', 'Male', 'Married', '555-765-4321', 'Jessica Gonzalez', 'robert.gonzalez@email.com', '888 Elm Rd', '', 'Riverside', '12345'),
  (1032, 'Jessica', 'Taylor', '1983-04-23', 'Female', 'Single', '555-654-3210', 'Robert Taylor', 'jessica.taylor@email.com', '999 Oak St', 'Unit 2A', 'Springfield', '34567'),
  (1033, 'Richard', 'Brown', '1995-08-30', 'Male', 'Single', '555-543-2109', 'Jennifer Brown', 'richard.brown@email.com', '111 Birch Rd', 'Apt 6D', 'Hillside', '78901'),
  (1034, 'Jennifer', 'Hernandez', '1984-12-10', 'Female', 'Married', '555-432-1098', 'Richard Hernandez', 'jennifer.hernandez@email.com', '222 Cedar St', '', 'Maplewood', '23456'),
  (1035, 'John', 'Smith', '1986-02-18', 'Male', 'Single', '555-321-0987', 'Emily Smith', 'john.smith@email.com', '333 Pine Rd', 'Suite 8E', 'Riverside', '56789'),
  (1036, 'Emily', 'Davis', '1989-06-25', 'Female', 'Divorced', '555-210-9876', 'John Davis', 'emily.davis@email.com', '444 Elm St', 'Apt 7B', 'Meadowville', '12345'),
  (1037, 'Daniel', 'Johnson', '1990-09-03', 'Male', 'Single', '555-109-8765', 'Susan Johnson', 'daniel.johnson@email.com', '555 Cedar Rd', 'Unit 3C', 'Springfield', '34567'),
  (1038, 'Susan', 'Wang', '1987-03-17', 'Female', 'Married', '555-987-6543', 'Daniel Wang', 'susan.wang@email.com', '777 Birch Ln', '', 'Hillside', '23456'),
  (1039, 'Matthew', 'Lee', '1985-11-22', 'Male', 'Single', '555-876-5432', 'Melissa Lee', 'matthew.lee@email.com', '888 Oak Rd', 'Suite 5F', 'Maplewood', '56789'),
  (1040, 'Melissa', 'Smith', '1992-01-14', 'Female', 'Married', '555-765-4321', 'Matthew Smith', 'melissa.smith@email.com', '999 Pine St', 'Apt 4A', 'Riverside', '78901'),
  (1041, 'Christopher', 'Garcia', '1980-04-07', 'Male', 'Single', '555-654-3210', 'Amy Garcia', 'christopher.garcia@email.com', '111 Elm St', '', 'Meadowville', '12345'),
  (1042, 'Amy', 'Chen', '1983-07-09', 'Female', 'Married', '555-543-2109', 'Christopher Chen', 'amy.chen@email.com', '222 Oak Ln', 'Unit 6C', 'Hillsborough', '23456'),
  (1043, 'Daniel', 'Davis', '1986-12-12', 'Male', 'Single', '555-432-1098', 'Emily Davis', 'daniel.davis@email.com', '333 Birch Rd', '', 'Riverside', '34567'),
  (1044, 'Emily', 'Martinez', '1990-02-17', 'Female', 'Married', '555-321-0987', 'Daniel Martinez', 'emily.martinez@email.com', '444 Elm St', 'Apt 5D', 'Maplewood', '45678'),
  (1045, 'Matthew', 'Thompson', '1988-10-19', 'Male', 'Single', '555-210-9876', 'Sarah Thompson', 'matthew.thompson@email.com', '555 Cedar St', 'Suite 7E', 'Hillside', '56789');





select * from employees;
SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as formattedDob FROM employees ORDER BY employeeId DESC;