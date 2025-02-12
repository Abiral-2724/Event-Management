import { Event } from '../models/Event.model.js';
import { validationResult } from 'express-validator';
import moment from 'moment-timezone';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Create Event Controller
export const createEvent = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract event data from request body
    const {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      timezone,
      location,
      category,
      capacity,
      isPublic,
      tags,
      typeofevent,
      status
    } = req.body;

    // Validate time format
    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
      return res.status(400).json({ error: 'Invalid time format. Use HH:mm (24-hour format).' });
    }

    // Convert to Date object with timezone support
    const startDateTime = moment.tz(`${startDate} ${startTime}`, "YYYY-MM-DD HH:mm", timezone).toDate();
    const endDateTime = moment.tz(`${endDate} ${endTime}`, "YYYY-MM-DD HH:mm", timezone).toDate();

    if (endDateTime <= startDateTime) {
      return res.status(400).json({ error: 'End date/time must be after start date/time' });
    }

    if (startDateTime < Date.now()) {
      return res.status(400).json({ error: 'Start date/time cannot be in the past' });
    }

    // Validate capacity
    if (capacity < 1) {
      return res.status(400).json({ error: 'Capacity must be at least 1' });
    }

    // Check if category is valid
    const validCategories = ['Conference', 'Workshop', 'Social', 'Tech', 'Music', 'Business'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    let eventCoverImageUrl = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    // Process image upload if a file is provided
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      eventCoverImageUrl = cloudResponse.secure_url;
    }
    console.log('req id = ',req.id);
    // Create new event
    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      timezone,
      location,
      category,
      capacity,
      owner: req.id , // Assuming user ID is set by authentication middleware
      isPublic,
      tags: tags || [],
      typeofevent,
      status,
      eventcoverimage: eventCoverImageUrl
    });

    // Save the event
    await event.save();

    // Populate owner details
    await event.populate('owner', 'name email');

    res.status(201).json({
      message: 'Event created successfully',
      event
    });

  } catch (error) {
    console.error('Error in createEvent:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


// Get all events with optional pagination
export const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { status: 'published' }; // Only fetch published events by default

    // If user wants to see draft events (assuming they're authorized)
    if (req.query.includeAll && req.id) {
      query.$or = [
        { status: 'published' },
        { owner: req.id }
      ];
    }

    const events = await Event.find(query)
      .populate('owner', 'name email')
      .sort({ startDate: 1, startTime: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(query);

    res.status(200).json({
      events,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total
    });
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

export const getEventsByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      const query = { 
        owner: userId
      };
  
      // If the requesting user is the owner, show all their events
      // If not, only show published events
      if (req.id !== userId) {
        query.status = 'published';
      }
  
      const events = await Event.find(query)
        .populate('owner', 'name email')
        .sort({ startDate: -1, startTime: -1 })
        .skip(skip)
        .limit(limit);
  
      const total = await Event.countDocuments(query);
  
      if (events.length === 0) {
        return res.status(404).json({ message: 'No events found for this user' });
      }
  
      res.status(200).json({
        events,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalEvents: total
      });
      
    } catch (error) {
      console.error('Error in getEventsByUserId:', error);
      
      // Handle invalid ID format error
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }
      
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };

// Advanced search with multiple filters

export const searchEvents = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      category,
      typeofevent,
      location,
      searchTerm,
      timezone = 'UTC'
    } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Initialize query object with published status
    let query = { status: 'published' };

    // Build query conditions array for $and operation
    const conditions = [];

    // Date range filter
    if (startDate || endDate) {
      const dateFilter = {};
      
      if (startDate) {
        const startDateTime = moment.tz(startDate, timezone).startOf('day').toDate();
        dateFilter.$gte = startDateTime;
      }
      
      if (endDate) {
        const endDateTime = moment.tz(endDate, timezone).endOf('day').toDate();
        dateFilter.$lte = endDateTime;
      }

      // Validate dates if both are provided
      if (startDate && endDate && dateFilter.$lte <= dateFilter.$gte) {
        return res.status(400).json({ 
          error: 'Invalid date range',
          message: 'End date must be after start date'
        });
      }

      conditions.push({ startDate: dateFilter });
    }

    // Category filter
    if (category) {
      const validCategories = ['Conference', 'Workshop', 'Social', 'Tech', 'Music', 'Business'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ 
          error: 'Invalid category',
          message: `Category must be one of: ${validCategories.join(', ')}`
        });
      }
      conditions.push({ category });
    }

    // Event type filter
    if (typeofevent) {
      if (!['Free', 'Paid'].includes(typeofevent)) {
        return res.status(400).json({ 
          error: 'Invalid event type',
          message: 'Event type must be either Free or Paid'
        });
      }
      conditions.push({ typeofevent });
    }

    // Location filter (case-insensitive partial match)
    if (location) {
      conditions.push({
        location: { $regex: location.trim(), $options: 'i' }
      });
    }

    // Search term filter across multiple fields
    if (searchTerm) {
      const searchFilter = {
        $or: [
          { title: { $regex: searchTerm.trim(), $options: 'i' } },
          { description: { $regex: searchTerm.trim(), $options: 'i' } },
          { tags: { $regex: searchTerm.trim(), $options: 'i' } }
        ]
      };
      conditions.push(searchFilter);
    }

    // Combine all conditions with $and operator if there are any conditions
    if (conditions.length > 0) {
      query.$and = conditions;
    }

    // Execute query with pagination and sorting
    const events = await Event.find(query)
      .populate('owner', 'name email')
      .sort({ startDate: 1, startTime: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(query);

    // Return appropriate response based on whether events were found
    if (events.length === 0) {
      return res.status(200).json({
        message: 'No events found matching the specified criteria',
        events: [],
        currentPage: page,
        totalPages: 0,
        totalEvents: 0,
        filters: {
          startDate,
          endDate,
          category,
          typeofevent,
          location,
          searchTerm
        }
      });
    }

    res.status(200).json({
      message: 'Events found successfully',
      events,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
      filters: {
        startDate,
        endDate,
        category,
        typeofevent,
        location,
        searchTerm
      }
    });

  } catch (error) {
    console.error('Error in searchEvents:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: 'An error occurred while searching for events',
      details: error.message 
    });
  }
};

export const joinEvent = async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const eventId = req.params.eventId;
      const userId = req.id; // From auth middleware
  
      // Check if event exists
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Check if event is published
      if (event.status !== 'published') {
        return res.status(400).json({ error: 'Cannot join an unpublished event' });
      }
  
      // Check if event has already started
      const eventStartDateTime = moment.tz(
        `${event.startDate} ${event.startTime}`,
        "YYYY-MM-DD HH:mm",
        event.timezone
      ).toDate();
  
      if (eventStartDateTime < new Date()) {
        return res.status(400).json({ error: 'Cannot join an event that has already started' });
      }
  
      // Check if user is the event owner
      if (event.owner.toString() === userId) {
        return res.status(400).json({ error: 'Event owner cannot join their own event as a participant' });
      }
  
      // Check if user is already a participant
      if (event.participants?.includes(userId)) {
        return res.status(400).json({ error: 'User is already a participant in this event' });
      }
  
      // Check capacity
      if (event.participants?.length >= event.capacity) {
        return res.status(400).json({ error: 'Event has reached maximum capacity' });
      }
  
      // Add user to participants array
      if (!event.participants) {
        event.participants = [];
      }
      
      event.participants.push(userId);
      await event.save();
  
      // Populate owner and participants details
      await event.populate('owner', 'name email');
      await event.populate('attendees', 'userId');
  
      res.status(200).json({
        message: 'Successfully joined the event',
        event
      });
  
    } catch (error) {
      console.error('Error in joinEvent:', error);
      
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid event ID format' });
      }
      
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };

// Helper function to validate time format (HH:mm)
const isValidTimeFormat = (time) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

