const Deposit = require('../models/Deposit');

// @desc    Create a fixed deposit
// @route   POST /api/deposits
// @access  Private
exports.createDeposit = async (req, res) => {
  const { depositAmount, term } = req.body;

  // Validate depositAmount (must be a positive number)
  if (isNaN(depositAmount) || depositAmount <= 0) {
    return res.status(400).json({ msg: 'Invalid deposit amount. It must be a positive number.' });
  }

  // Parse and validate the term (must be a positive integer)
  const parsedTerm = parseInt(term, 10);
  if (isNaN(parsedTerm) || parsedTerm <= 0) {
    return res.status(400).json({ msg: 'Invalid term. It must be a positive integer.' });
  }

  // Get the current date
  const currentDate = new Date();
  console.log('Current Date:', currentDate);  // Debugging to check the current date

  // Calculate the maturity date by adding months to the current date
  const maturityDate = new Date(currentDate);
  maturityDate.setMonth(currentDate.getMonth() + parsedTerm);

  console.log('Maturity Date:', maturityDate);  // Debugging to check the maturity date after adding months

  try {
    // Create a new deposit with the maturity date
    const deposit = new Deposit({
      user: req.user.id,  // Ensure req.user is set correctly via authentication middleware
      depositAmount: parseFloat(depositAmount),  // Ensure depositAmount is stored as a number
      term: parsedTerm,
      maturityDate,
    });

    // Save the new deposit to the database
    await deposit.save();

    // Return the saved deposit in the response
    res.json(deposit);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all deposits for the user
// @route   GET /api/deposits
// @access  Private
exports.getDeposits = async (req, res) => {
  try {
    // Find deposits by the authenticated user
    const deposits = await Deposit.find({ user: req.user.id });
    
    // Return the list of deposits
    res.json(deposits);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
