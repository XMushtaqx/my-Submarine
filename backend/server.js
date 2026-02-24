const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Route Files
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

// 1. Load environment variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middleware Configuration
app.use(cors()); 
app.use(express.json()); 

// 4. Route Definitions 
// --- VERSION 1 API CLUSTER ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/user', userRoutes); // Fixed: Added /v1 to match your frontend api.js

// 5. Basic "Ping" Route for health checks
app.get('/', (req, res) => {
  res.send('SUBMARINE SERVER IS ONLINE // READY FOR COMMANDS');
});

// 6. Global Error Handler (Optional but helpful for debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// 7. Start the Engine
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`📡 SERVER TRANSMITTING ON PORT ${PORT}`);
  console.log(`🔗 API ENDPOINT: http://localhost:${PORT}/api/v1`);
});