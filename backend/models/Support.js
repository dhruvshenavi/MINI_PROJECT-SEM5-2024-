const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Support', SupportSchema);
