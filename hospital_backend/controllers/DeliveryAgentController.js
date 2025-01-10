const pool = require('../config/db');

// Create a new delivery agent
exports.createDeliveryAgent = async (req, res) => {
  const { name, contact_info, status, assigned_meals } = req.body;

  // Ensure assigned_meals is an array. If it's a string, split it into an array.
  const assignedMealsArray = Array.isArray(assigned_meals) ? assigned_meals : assigned_meals.split(',').map(meal => meal.trim());

  try {
    const result = await pool.query(
      'INSERT INTO Delivery_Agent (name, contact_info, status, assigned_meals) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, contact_info, status, assignedMealsArray]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting delivery agent:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get all delivery agents
exports.getAllDeliveryAgents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Delivery_Agent');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching delivery agents:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getDeliveryAgentByName = async (req, res) => {
  const { name } = req.body; 

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM Delivery_Agent WHERE name = $1', [name]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Delivery agent not found' });
    }

    res.json(result.rows); 
  } catch (error) {
    console.error('Error fetching delivery agent by name:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Update delivery agent by ID
exports.updateDeliveryAgent = async (req, res) => {
  const { id } = req.params;
  const { name, contact_info, status, assigned_meals } = req.body;

  // Ensure assigned_meals is an array. If it's a string, split it into an array.
  const assignedMealsArray = Array.isArray(assigned_meals) ? assigned_meals : assigned_meals.split(',').map(meal => meal.trim());

  try {
    const result = await pool.query(
      'UPDATE Delivery_Agent SET name=$1, contact_info=$2, status=$3, assigned_meals=$4, updated_at=NOW() WHERE id=$5 RETURNING *',
      [name, contact_info, status, assignedMealsArray, id]
    );
    if (result.rows.length === 0) {
      res.status(404).send('Delivery Agent Not Found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating delivery agent:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateDeliveryAgentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Delivery_Agent SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Delivery Agent Not Found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating delivery agent status:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Delete delivery agent by ID
exports.deleteDeliveryAgent = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the delivery agent exists
    const checkExistence = await pool.query('SELECT 1 FROM Delivery_Agent WHERE id=$1', [id]);
    if (checkExistence.rowCount === 0) {
      return res.status(404).send('Delivery Agent Not Found');
    }

    const result = await pool.query('DELETE FROM Delivery_Agent WHERE id=$1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting delivery agent:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Get the number of orders delivered in the last 5 days
exports.getOrdersDeliveredLast5Days = async (req, res) => {
  try {
    // SQL query to count the number of orders delivered in the last 5 days
    const result = await pool.query(`
      SELECT COUNT(*) AS orders_delivered, DATE(updated_at) AS date
      FROM Delivery_Agent
      WHERE status = 'Delivered'
      AND updated_at >= NOW() - INTERVAL '5 days'
      GROUP BY DATE(updated_at)
      ORDER BY DATE(updated_at) DESC;

    `);

    // Send the result as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching order counts:', error);
    res.status(500).send('Internal Server Error');
  }
};
