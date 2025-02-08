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
  category: {
    type: String,
    enum: ['Conference', 'Workshop', 'Meetup', 'Seminar', 'Other'],
    default: 'Other'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxAttendees: {
    type: Number,
    default: 100
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  }
}, { 
  timestamps: true 
});

// Middleware to update event status
EventSchema.pre('save', function(next) {
  const now = new Date();
  if (this.date < now) {
    this.status = 'Completed';
  } else if (this.date <= now && this.date > now - 24 * 60 * 60 * 1000) {
    this.status = 'Ongoing';
  }
  next();
});

module.exports = mongoose.model('Event', EventSchema);