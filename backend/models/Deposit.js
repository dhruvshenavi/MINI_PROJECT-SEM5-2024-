const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  depositAmount: { type: Number, required: true },
  term: { type: Number, required: true }, // in months
  interestRate: { type: Number, default: 5 }, // Assuming a 5% default interest rate
  maturityDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deposit', DepositSchema);
