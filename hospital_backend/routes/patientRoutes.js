const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientStaffController');

// Patient routes
router.post('/patients', patientController.createPatient);  // Create a new patient
router.get('/patients', patientController.getAllPatients);  // Fetch all patients
router.put('/patients/:id', patientController.updatePatient);  // Update patient details
router.delete('/patients/:id', patientController.deletePatient);  // Delete patient

module.exports = router;
