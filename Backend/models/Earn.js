const mongoose = require('mongoose');

const EarnSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
  dateEarned: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Earn', EarnSchema);
