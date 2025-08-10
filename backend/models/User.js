const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

// Define the schema for User model

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware to hash password before saving

userSchema.pre("save", async function (next) { 
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password

userSchema.methods.matchPassword = async function (enteredPassword) { 
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model

module.exports = mongoose.model('User', userSchema); 