const Job = require('../models/job'); // 🚢 Import the blueprint

// @desc    Create a new job
// @route   POST /api/v1/jobs
exports.createJob = async (req, res) => {
  try {
    // req.user.id comes from our 'protect' middleware
    req.body.createdBy = req.user.id;
    
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all jobs for logged in user
// @route   GET /api/v1/jobs
exports.getJobs = async (req, res) => {
  try {
    // Only find jobs created by THIS specific user
    const jobs = await Job.find({ createdBy: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a job
// @route   PATCH /api/v1/jobs/:id
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Make sure user owns the job before they edit it
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/v1/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Make sure user owns the job before they delete it
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await job.deleteOne();
    res.status(200).json({ success: true, message: 'Job removed' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};