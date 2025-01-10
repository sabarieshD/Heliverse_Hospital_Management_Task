require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import the routes
const patientRoutes = require('../routes/patientRoutes');
const pantryStaffRoutes = require('../routes/pantryStaffRoutes');
const deliveryAgentRoutes = require('../routes/DeliveryAgentRoutes');
const loginRoutes = require('../routes/LoginRoutes');

const app = express();

// Enable CORS with specific settings
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Use your specific routes with /api prefix
app.use('/api/patients', patientRoutes);
app.use('/api/pantry', pantryStaffRoutes);
app.use('/api/delivery', deliveryAgentRoutes);
app.use('/api/auth', loginRoutes);

// Connect to the MongoDB database
mongoose.connect(process.env.DB_CONNECTION_STRING);

const database = mongoose.connection;

// Error handling for database connection
database.on('error', (err) => console.log(err));

// Log success message when connected to database
database.on("connected", () => console.log('Database Connected'));

// Export the app for Vercel
module.exports = app;
