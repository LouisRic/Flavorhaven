const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Register user baru
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Validasi password minimal 6 karakter
    if (password.length < 6) {
      return res.status(400).json({ 
        error: "Password must be at least 6 characters" 
      });
    }
    
    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    if (existingUser) {
      return res.status(400).json({ 
        error: "User with this email or username already exists" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    
    await user.save();
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    // Response tanpa password
    const userResponse = { ...user.toObject() };
    delete userResponse.password;
    
    res.status(201).json({
      message: "Registration successful",
      user: userResponse,
      token
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Check password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    // Response tanpa password
    const userResponse = { ...user.toObject() };
    delete userResponse.password;
    
    res.json({ 
      message: "Login successful", 
      user: userResponse,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user profile (protected route)
exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Dari auth middleware
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};