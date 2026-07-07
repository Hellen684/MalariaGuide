const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (email.includes('@') && password.length >= 4) {
    return res.json({
      success: true,
      message: 'Login successful',
      token: 'mock-jwt-token-xyz123',
      user: { email, name: 'Health Officer' }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials.' });
});

module.exports = router;