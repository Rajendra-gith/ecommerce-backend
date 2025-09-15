const mongoose = require('mongoose');

// Define the structure of the user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,   // The name must be text
    required: true,  // It's a required field
  },
  email: {
    type: String,   // Email is text
    required: true,  // Must be provided
    unique: true,   // No two users can have the same email
  },
  password: {
    type: String,   // Password is text
    required: true,  // Must be provided
  },
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create a model named 'User' using the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export this model so it can be used elsewhere
