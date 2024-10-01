const express = require('express');
const router = express.Router();
const { applyLoan, getLoans } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

// Apply for a loan
router.post('/', protect, applyLoan);

// Get all loans for the user
router.get('/', protect, getLoans);

module.exports = router;
