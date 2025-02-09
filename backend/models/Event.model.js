import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,  // Store as "HH:mm" format
    required: true
  },
  endTime: {
    type: String,  // Store as "HH:mm" format
    required: true
  },
  timezone: {
    type: String,
    required: true,
    default: 'UTC'
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Conference', 'Workshop', 'Social', 'Tech', 'Music', 'Business']
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true 
  },
  attendees: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedAt: { type: Date, default: Date.now }
}],
  isPublic: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  typeofevent: {
    type: String,
    enum: ['Free', 'Paid'],
    default: 'Free'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'published'
  },
  eventcoverimage: {
    type: String,
    default: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
}, {
  timestamps: true
});

// Pre-save hook to ensure capacity isn't exceeded
eventSchema.pre('save', function (next) {
  if (this.attendees.length > this.capacity) {
    return next(new Error('Attendee count exceeds event capacity'));
  }
  next();
});

export const Event = mongoose.model('Event', eventSchema);
