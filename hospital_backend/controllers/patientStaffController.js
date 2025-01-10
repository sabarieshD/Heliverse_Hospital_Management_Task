const pool = require('../config/db');  

exports.createPatient = async (req, res) => {
  const {
    name,
    diseases,
    allergies,
    roomNumber,
    bedNumber,
    floorNumber,
    age,
    gender,
    contactInfo,
    emergencyContact,
    others,
  } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO patient (name, diseases, allergies, room_number, bed_number, floor_number, age, gender, contact_info, emergency_contact, others) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [name, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact, others]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).send('Error creating patient');
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patient');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).send('Error fetching patients');
  }
};

// Update a patient's details (PUT)
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    diseases,
    allergies,
    roomNumber,
    bedNumber,
    floorNumber,
    age,
    gender,
    contactInfo,
    emergencyContact,
    others,
  } = req.body;

  try {
    const result = await pool.query(
      'UPDATE patient SET name=$1, diseases=$2, allergies=$3, room_number=$4, bed_number=$5, floor_number=$6, age=$7, gender=$8, contact_info=$9, emergency_contact=$10, others=$11 WHERE id=$12 RETURNING *',
      [name, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact, others, id]
    );
    if (result.rows.length === 0) {
      res.status(404).send('Patient Not Found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).send('Error updating patient');
  }
};

// Delete a patient (DELETE)
exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM patient WHERE id=$1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Patient Not Found');
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).send('Error deleting patient');
  }
};
