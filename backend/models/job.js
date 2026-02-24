const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please add a position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['pending', 'interview', 'declined'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // 🔗 This connects the job to the specific Pilot
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);