const Event = require('../models/Event');
const User = require('../models/User');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    // Support pagination and filtering
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const upcoming = req.query.upcoming === 'true';
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter for upcoming events only
    if (upcoming) {
      query.date = { $gte: new Date() };
    }
    
    const events = await Event.find(query)
      .sort({ date: 1 }) // Chronological order
      .skip(skip)
      .limit(limit)
      .populate('organizer', 'name avatar');
    
    const total = await Event.countDocuments(query);
    
    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name avatar bio')
      .populate('attendees', 'name avatar');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error fetching event' });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, image, maxAttendees, ecoPointsReward } = req.body;
    
    const newEvent = new Event({
      title,
      description,
      date: new Date(date),
      location,
      organizer: req.user.id,
      category,
      image,
      maxAttendees: maxAttendees || null,
      ecoPointsReward: ecoPointsReward || 10
    });
    
    const event = await newEvent.save();
    
    // Populate organizer info before sending response
    await event.populate('organizer', 'name avatar');
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error creating event' });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, image, maxAttendees, ecoPointsReward } = req.body;
    
    // Find event and check ownership
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the organizer or an admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    
    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date: date ? new Date(date) : event.date,
        location,
        category,
        image,
        maxAttendees: maxAttendees || event.maxAttendees,
        ecoPointsReward: ecoPointsReward || event.ecoPointsReward
      },
      { new: true }
    ).populate('organizer', 'name avatar');
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error updating event' });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the organizer or an admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error deleting event' });
  }
};

// Join/leave event
exports.toggleAttendance = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if max attendees limit is reached
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees && 
        !event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'Event has reached maximum capacity' });
    }
    
    // Check if user is already attending
    const alreadyAttending = event.attendees.includes(req.user.id);
    
    if (alreadyAttending) {
      // Leave event
      event.attendees = event.attendees.filter(
        attendee => attendee.toString() !== req.user.id
      );
    } else {
      // Join event
      event.attendees.push(req.user.id);
    }
    
    await event.save();
    
    res.json({ 
      attendees: event.attendees, 
      attendeeCount: event.attendees.length,
      isAttending: !alreadyAttending
    });
  } catch (error) {
    console.error('Toggle attendance error:', error);
    res.status(500).json({ message: 'Server error toggling attendance' });
  }
};

// Mark event as completed and award eco points
exports.completeEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the organizer or an admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to complete this event' });
    }
    
    // Check if event date is in the past
    if (new Date(event.date) > new Date()) {
      return res.status(400).json({ message: 'Cannot complete an event before its scheduled date' });
    }
    
    // Award eco points to all attendees
    const pointsAwarded = [];
    
    for (const attendeeId of event.attendees) {
      const user = await User.findById(attendeeId);
      
      if (user) {
        user.ecoPoints += event.ecoPointsReward;
        await user.save();
        
        pointsAwarded.push({
          userId: user._id,
          name: user.name,
          pointsAwarded: event.ecoPointsReward,
          totalPoints: user.ecoPoints
        });
      }
    }
    
    res.json({
      message: 'Event completed and eco points awarded successfully',
      pointsAwarded
    });
  } catch (error) {
    console.error('Complete event error:', error);
    res.status(500).json({ message: 'Server error completing event' });
  }
};
