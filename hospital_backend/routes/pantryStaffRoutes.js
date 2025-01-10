const express = require('express');
const router = express.Router();
const pantryStaffController = require('../controllers/pantryStaffController');  // Import pantry staff controller

// Create a new pantry staff member
router.post('/pantry-staff', pantryStaffController.createPantryStaff);

// Get all pantry staff members
router.get('/pantry-staff', pantryStaffController.getAllPantryStaff);

// Update pantry staff member by ID
router.put('/pantry-staff/:id', pantryStaffController.updatePantryStaff);

// Delete pantry staff member by ID
router.delete('/pantry-staff/:id', pantryStaffController.deletePantryStaff);

module.exports = router;

