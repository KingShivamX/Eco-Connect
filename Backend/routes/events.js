const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect, admin } = require('../middlewares/auth');

// Event routes
router.get('/', eventController.getAllEvents); // Public route to get all events
router.get('/:id', eventController.getEventById); // Public route to get event by id

// Protected routes
router.post('/', protect, eventController.createEvent);
router.put('/:id', protect, eventController.updateEvent);
router.delete('/:id', protect, eventController.deleteEvent);
router.post('/:id/attend', protect, eventController.toggleAttendance);
router.post('/:id/complete', protect, eventController.completeEvent);

module.exports = router;
