const express = require('express');
const router = express.Router();
const deliveryAgentController = require('../controllers/DeliveryAgentController');  // Import delivery agent controller

// Create a new delivery agent
router.post('/delivery-agent', deliveryAgentController.createDeliveryAgent);

// Get all delivery agents
router.get('/delivery-agent', deliveryAgentController.getAllDeliveryAgents);

// Update delivery agent by ID
router.put('/delivery-agent/:id', deliveryAgentController.updateDeliveryAgent);

// Delete delivery agent by ID
router.delete('/delivery-agent/:id', deliveryAgentController.deleteDeliveryAgent);

router.post('/delivery-agent-specific', deliveryAgentController.getDeliveryAgentByName);

router.put('/delivery-agent/status/:id', deliveryAgentController.updateDeliveryAgentStatus);

router.get('/orders/last5days', deliveryAgentController.getOrdersDeliveredLast5Days);

module.exports = router;
