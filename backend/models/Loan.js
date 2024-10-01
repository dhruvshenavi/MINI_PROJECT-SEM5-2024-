const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanType: { type: String, required: true },
  amount: { type: Number, required: true },
  repaymentPeriod: { type: Number, required: true }, // in months
  status: { type: String, enum: ['submitted', 'approved', 'rejected'], default: 'submitted' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', LoanSchema);
