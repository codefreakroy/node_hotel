const mongoose = require("mongoose");

// Define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

// Set up the mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the Mongodb connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log("Connected to MongoDB Server")
})

db.on('disconnected', () => {
    console.log("Connected Lost to MongoDB Server")
})

db.on('error', (err) => {
    console.error("MongoDB Connection error", err)
})

// Export the database connection
module.exports = db