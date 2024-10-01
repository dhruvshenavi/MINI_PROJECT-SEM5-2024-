const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = new User({ name, email, phone, password });
    await user.save();
    const token = generateToken(user._id);

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, balance: user.balance } });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, balance: user.balance } });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
