const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token, // Sending the keycard back to the user
      message: "Pilot Registered Successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email & password exist
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // 2. Check for user (select +password because it's hidden in the model)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 3. Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 4. Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      message: "Welcome back, Pilot."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};