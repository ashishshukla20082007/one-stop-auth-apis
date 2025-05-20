const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const app = express();
const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB
app.use(express.json());
app.use('/api/contacts', require('./routes/contacts/contactRoutes'));
app.use('/api/v1/auth', require('./routes/user/userRoutes'));
app.use('/api/v1/employees', require('./routes/employee/employeeRoutes'));
app.use('/api/v1/employers', require('./routes/employer/employerRoutes'));
app.use(errorHandler);
app.listen(port, () => {               
    console.log(`Server is running on port ${port}`);
});

