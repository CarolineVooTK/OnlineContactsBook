const express = require('express');
// const verifyToken = require('../controllers/authController');
const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');

const router = express.Router();

// @route POST api/user/register
// @desc user register
// @access Public
router.post('/register', authController.register);

// @route POST api/user/login
// @desc user login
// @access Public
router.post('/login', authController.login);

// @route PUT api/user/update-password
// @desc Update user password
// @access Private
// router.put('/update-password', verifyToken, updatePassword);

// @route DELETE api/user/delete-user
// @desc Delete user password
// @access Private
// router.delete('/delete-user', verifyToken, deleteUser);

module.exports = router;
