const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/user/userRoutes');
const candidateRoutes = require('./routes/candidate/candidateRoutes');     
const employerRoutes = require('./routes/employer/employerRoutes');
const contactRoutes = require('./routes/contacts/contactRoutes');


const app = express();

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

app.use(express.json());
app.use('/api/contacts', contactRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/employers', employerRoutes);  

app.use(errorHandler);

app.listen(port, () => {               
    console.log(`Server is running on port ${port}`);
});

