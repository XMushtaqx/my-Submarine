const jwt = require('jsonwebtoken');
const User = require('../models/User'); // ⚓ Import the existing model, don't define it!

const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Make sure token exists
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the user to the request
    // Controllers can now use req.user.id to find the user in the database
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
    }

    next();
  } catch (err) {
    console.error('Auth Error:', err.message);
    return res.status(401).json({ 
      success: false, 
      message: 'Token is invalid or expired' 
    });
  }
};

module.exports = { protect };