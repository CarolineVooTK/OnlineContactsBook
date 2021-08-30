const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

// @route POST api/auth/register
// @desc register user
// @access public
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Simple Validation
  if (!username || !password || !email) {
    // No username or password specify
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user) {
      // Username taken
      return res
        .status(400)
        .json({ success: false, message: 'Username is taken' });
    }

    // Create and save new account
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    // Return access token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
    );

    return res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
