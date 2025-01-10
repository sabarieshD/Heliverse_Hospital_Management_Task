const express = require('express');
const router = express.Router();
const pantryStaffController = require('../controllers/pantryStaffController');  

// Create a new pantry staff member
router.post('/', pantryStaffController.createPantryStaff);

// Get all pantry staff members
router.get('/', pantryStaffController.getAllPantryStaff);

// Update pantry staff member by ID
router.put('/:id', pantryStaffController.updatePantryStaff);

// Delete pantry staff member by ID
router.delete('/:id', pantryStaffController.deletePantryStaff);

module.exports = router;

