const Loan = require('../models/Loan');

// @desc    Apply for a loan
// @route   POST /api/loans
// @access  Private
exports.applyLoan = async (req, res) => {
  const { loanType, amount, repaymentPeriod } = req.body;

  try {
    const loan = new Loan({
      user: req.user.id,
      loanType,
      amount,
      repaymentPeriod
    });
    await loan.save();
    res.json(loan);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Get active loans for a user
// @route   GET /api/loans
// @access  Private
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
