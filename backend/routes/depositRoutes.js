const express = require('express');
const router = express.Router();
const { createDeposit, getDeposits } = require('../controllers/depositController');
const { protect } = require('../middleware/authMiddleware');

// Create a fixed deposit
router.post('/', protect, createDeposit);

// Get all deposits for the user
router.get('/', protect, getDeposits);

module.exports = router;
