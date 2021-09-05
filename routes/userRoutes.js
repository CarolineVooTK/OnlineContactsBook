const express = require('express');
const verifyToken = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  updatePassword,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// @route POST api/user/register
// @desc register user
// @access Public
router.post('/register', registerUser);

// @route POST api/user/login
// @desc Login user
// @access Public
router.post('/login', loginUser);

// @route PUT api/user/update-password
// @desc Update user password
// @access Private
router.put('/update-password', verifyToken, updatePassword);

// @route DELETE api/user/delete-user
// @desc Delete user password
// @access Private
router.delete('/delete-user', verifyToken, deleteUser);

module.exports = router;
