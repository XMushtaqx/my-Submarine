const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware'); // Path to your middleware

// @desc    Get current logged in user
// @route   GET /api/user/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Update user profile
// @route   PATCH /api/user/update-profile
// @access  Private
router.patch('/update-profile', protect, async (req, res) => {
  try {
    const { name, password, avatarId, stealthMode } = req.body;

    // Find user
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (avatarId !== undefined) user.avatarId = avatarId;
    if (stealthMode !== undefined) user.stealthMode = stealthMode;
    
    // Only update password if provided
    if (password && password.trim().length >= 6) {
      user.password = password; 
    }

    // .save() will trigger the UserSchema.pre('save') middleware to hash the password
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Telemetry Synchronized',
      data: {
        name: user.name,
        email: user.email,
        avatarId: user.avatarId,
        stealthMode: user.stealthMode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;