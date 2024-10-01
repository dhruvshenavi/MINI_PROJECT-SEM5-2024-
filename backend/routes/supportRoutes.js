const express = require('express');
const router = express.Router();
const { submitSupportRequest, getSupportRequests } = require('../controllers/supportController');
const { protect } = require('../middleware/authMiddleware');

// Submit a support request
router.post('/', protect, submitSupportRequest);

// Get all support requests
router.get('/', protect, getSupportRequests);

module.exports = router;
