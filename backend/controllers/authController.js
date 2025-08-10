const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  console.log('=== REGISTRATION ATTEMPT ===');
  console.log('Request body:', req.body);
  console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
  
  const { name, email, password } = req.body;
  
  console.log('Extracted data:', { name, email, password: password ? 'provided' : 'missing' });

  try {
    console.log('Checking if user exists for email:', email);
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      console.log('User already exists');
      return res.status(400).json({ message: "User already exists" });
    }

    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password,
    });

    console.log('User created successfully:', user.id);
    console.log('Generating token...');
    const token = generateToken(user.id);
    console.log('Token generated successfully');

    res.status(201).json({
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.error('=== REGISTRATION ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  console.log('=== LOGIN ATTEMPT ===');
  console.log('Request body:', req.body);
  
  const { email, password } = req.body;
  
  console.log('Extracted data:', { email, password: password ? 'provided' : 'missing' });

  try {
    console.log('Finding user with email:', email);
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      console.log('Login successful for user:', user.id);
      
      const token = generateToken(user.id);
      console.log('Token generated for login');
      
      res.json({
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } else {
      console.log('Login failed - invalid credentials');
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error('=== LOGIN ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    res.status(500).json({ message: "Server error" });
  }
};