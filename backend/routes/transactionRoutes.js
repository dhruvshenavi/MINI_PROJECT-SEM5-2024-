const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// Create a transaction
router.post('/', protect, createTransaction);

// Get all transactions
router.get('/', protect, getTransactions);

module.exports = router;
