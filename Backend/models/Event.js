const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: String,
  category: {
    type: String,
    enum: ['cleanup', 'workshop', 'seminar', 'volunteer', 'planting', 'other'],
    default: 'other'
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxAttendees: {
    type: Number,
    default: null
  },
  ecoPointsReward: {
    type: Number,
    default: 10
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
