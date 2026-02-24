const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use the MONGO_URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // If successful, this will print in your terminal
    console.log(`🌊 SONAR LINKED: MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it fails (bad password, no internet), it prints the error
    console.error(`❌ SONAR FAILURE: ${error.message}`);
    process.exit(1); // Shuts down the server
  }
};

module.exports = connectDB;