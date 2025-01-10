const pool = require('../config/db');

// Create a new pantry staff member
exports.createPantryStaff = async (req, res) => {
  const { name, contact_info, location, assigned_tasks, status, special_instruction } = req.body;
  
  // Ensure assigned_tasks is an array. If it's a string, split it into an array.
  const assignedTasksArray = Array.isArray(assigned_tasks) ? assigned_tasks : assigned_tasks.split(',').map(task => task.trim());

  try {
    const result = await pool.query(
      'INSERT INTO pantry_staff (name, contact_info, location, assigned_tasks, status, special_instruction) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, contact_info, location, assignedTasksArray, status, special_instruction]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting pantry staff:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get all pantry staff members
exports.getAllPantryStaff = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pantry_staff');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pantry staff:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Update pantry staff member by ID
exports.updatePantryStaff = async (req, res) => {
  const { id } = req.params;
  const { name, contact_info, location, assigned_tasks, status, special_instruction } = req.body;
  
  // Ensure assigned_tasks is an array. If it's a string, split it into an array.
  const assignedTasksArray = Array.isArray(assigned_tasks) ? assigned_tasks : assigned_tasks.split(',').map(task => task.trim());

  try {
    const result = await pool.query(
        'UPDATE pantry_staff SET name=$1, contact_info=$2, location=$3, assigned_tasks=$4, status=$5, special_instruction=$6, updated_at=NOW() WHERE id=$7 RETURNING *',
        [name, contact_info, location, assignedTasksArray, status, special_instruction, id]
      );
    if (result.rows.length === 0) {
      res.status(404).send('Pantry Staff Not Found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating pantry staff:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete pantry staff member by ID
exports.deletePantryStaff = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the pantry staff exists
    const checkExistence = await pool.query('SELECT 1 FROM pantry_staff WHERE id=$1', [id]);
    if (checkExistence.rowCount === 0) {
      return res.status(404).send('Pantry Staff Not Found');
    }

    const result = await pool.query('DELETE FROM pantry_staff WHERE id=$1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting pantry staff:', error);
    res.status(500).send('Internal Server Error');
  }
};
