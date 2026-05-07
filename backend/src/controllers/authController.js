const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation - fix lỗi empty body
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, password' 
      });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    return res.status(201).json({
      token: sign(user.id),
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation - fix lỗi empty body
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Missing required fields: email, password' 
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      token: sign(user.id),
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};

const me = (req, res) => {
  return res.json({ user: req.user });
};

module.exports = {
  register,
  login,
  me,
};
