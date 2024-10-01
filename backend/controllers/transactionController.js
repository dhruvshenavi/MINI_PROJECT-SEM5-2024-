const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
exports.createTransaction = async (req, res) => {
  const { amount, type, description } = req.body;
  const userId = req.user.id; // Assuming user is authenticated and ID is available

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update balance based on the transaction type
    if (type === 'debit' && user.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    user.balance = type === 'credit' ? user.balance + amount : user.balance - amount;
    await user.save();

    const transaction = new Transaction({
      user: userId,
      amount,
      type,
      description,
      balanceAfterTransaction: user.balance
    });
    await transaction.save();

    res.json(transaction);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
