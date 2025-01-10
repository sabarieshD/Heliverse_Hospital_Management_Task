require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const patientRoutes = require('../routes/patientRoutes');
const pantryStaffRoutes = require('../routes/pantryStaffRoutes');
const DeliverAgentRoutes = require('../routes/DeliveryAgentRoutes');
const loginRoutes = require('../routes/LoginRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(bodyParser.json());

app.use('/api/auth', loginRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/pantry-staff', pantryStaffRoutes);
app.use('/api/delivery-agents', DeliverAgentRoutes);

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', (err) => console.error('Database connection error:', err));

database.once('connected', () => console.log('Database Connected'));

module.exports = app;
