const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true, 
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false, 
  },
  // ⚓ NEW SUBMARINE TELEMETRY FIELDS
  avatarId: {
    type: Number,
    default: 0, // Default to the first avatar icon
  },
  stealthMode: {
    type: Boolean,
    default: false, // Default to broadcast mode
  }
}, { timestamps: true });

// --- MIDDLEWARE: Encryption ---
// This runs every time you call .save() (used for registering and updating profile)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- METHOD: Match Password ---
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- METHOD: Generate Token ---
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// --- THE ONLY EXPORT ---
module.exports = mongoose.model('User', UserSchema);