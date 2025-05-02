const mongoose = require('mongoose');

const ParticipationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['joined', 'left'], default: 'joined' }
}, { timestamps: true });

module.exports = mongoose.model('Participation', ParticipationSchema);
