require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import the routes
const patientRoutes = require('./routes/patientRoutes');
const pantryStaffRoutes = require('./routes/pantryStaffRoutes');
const DeliverAgentRoutes = require('./routes/DeliveryAgentRoutes');
const loginRoutes = require('./routes/LoginRoutes');
// const routes = require('./routes'); // You may still want to use this for other routes

const app = express();

// Enable CORS with specific settings
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Use your specific routes
app.use(patientRoutes);
app.use(pantryStaffRoutes);
app.use(DeliverAgentRoutes);

app.use('/api/auth', loginRoutes); 
// Use general API routes as well
// app.use('/api', routes); // Ensure this is after specific routes if you want to avoid conflicts

// Connect to the MongoDB database
mongoose.connect(process.env.DB_CONNECTION_STRING);

const database = mongoose.connection;

// Error handling for database connection
database.on('error', (err) => console.log(err));

// Log success message when connected to database
database.on("connected", () => console.log('Database Connected'));

// Start the Express server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
