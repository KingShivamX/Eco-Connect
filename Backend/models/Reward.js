const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  badgeName: { type: String, required: true },
  type: { type: String, required: true },
  dateAwarded: { type: Date, default: Date.now },
  pointsRedeemed: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Reward', RewardSchema);
