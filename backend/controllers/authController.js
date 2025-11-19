const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const ROLES = ['faculty', 'student', 'admin'];

exports.signup = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!ROLES.includes(role.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    const userExists = await db.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userExists.rows.length) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (username, password, role)
       VALUES ($1, $2, $3) RETURNING id, username, role, created_at`,
      [username, hashedPassword, role.toLowerCase()],
    );

    res.status(201).json({
      message: 'Signup successful. Please login.',
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (!userResult.rows.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    if (user.role !== role.toLowerCase()) {
      return res.status(401).json({ message: 'Role does not match this account' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '8h' },
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
  });
};

