const express = require('express');
const router = express.Router();
const deliveryAgentController = require('../controllers/DeliveryAgentController'); 

// Create a new delivery agent
router.post('/', deliveryAgentController.createDeliveryAgent);

// Get all delivery agents
router.get('/', deliveryAgentController.getAllDeliveryAgents);

// Update delivery agent by ID
router.put('/:id', deliveryAgentController.updateDeliveryAgent);

// Delete delivery agent by ID
router.delete('/:id', deliveryAgentController.deleteDeliveryAgent);

router.post('/specific', deliveryAgentController.getDeliveryAgentByName);

router.put('/status/:id', deliveryAgentController.updateDeliveryAgentStatus);

router.get('/orders/last5days', deliveryAgentController.getOrdersDeliveredLast5Days);

module.exports = router;
