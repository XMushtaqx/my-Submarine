const Job = require('../controllers/jobController');

// Create a new job
const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all jobs for the logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Exporting as an object to ensure the route can find them
module.exports = {
  createJob,
  getJobs
};