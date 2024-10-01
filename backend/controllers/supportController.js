const Support = require('../models/Support');

// @desc    Submit a support request
// @route   POST /api/support
// @access  Private
exports.submitSupportRequest = async (req, res) => {
  const { issueType, description } = req.body;

  try {
    const support = new Support({
      user: req.user.id,
      issueType,
      description
    });
    await support.save();
    res.json(support);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Get all support tickets for a user
// @route   GET /api/support
// @access  Private
exports.getSupportRequests = async (req, res) => {
  try {
    const supportRequests = await Support.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(supportRequests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
