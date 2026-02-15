const express = require('express');
const Notification = require('../models/Notification');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

// Get all notifications (Admin)
router.get('/', auth, admin, async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mark as read (Admin)
router.put('/:id/read', auth, admin, async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        res.json(notification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create notification (Admin Internal or System)
router.post('/', auth, admin, async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
