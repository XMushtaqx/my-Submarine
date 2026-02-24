const express = require('express');
const router = express.Router();

// 1. Import the "Guard"
const { protect } = require('../middleware/authMiddleware');

// 2. Import ALL the Controller functions
const { 
    createJob, 
    getJobs, 
    updateJob, 
    deleteJob 
} = require('../controllers/jobController');

// 3. Define the routes

// Path: /api/v1/jobs
router.route('/')
  .post(protect, createJob) // Create a new job
  .get(protect, getJobs);   // Get all jobs for the user

// Path: /api/v1/jobs/:id (for specific jobs)
router.route('/:id')
  .patch(protect, updateJob)  // Update a specific job
  .delete(protect, deleteJob); // Delete a specific job

module.exports = router;