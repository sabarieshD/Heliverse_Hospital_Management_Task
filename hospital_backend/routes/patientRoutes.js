const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientStaffController');

router.post('/', patientController.createPatient);  // Create a new patient
router.get('/', patientController.getAllPatients);  // Fetch all patients
router.put('/:id', patientController.updatePatient);  // Update patient details
router.delete('/:id', patientController.deletePatient);  // Delete patient

module.exports = router;
