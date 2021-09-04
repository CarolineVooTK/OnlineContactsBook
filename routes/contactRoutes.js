const express = require('express');
const verifyToken = require('../middleware/auth');
const {
  createContact,
  getAllContact,
  getOneContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

// @route POST api/contact/create
// @desc create contact
// @access Private
router.post('/create', verifyToken, createContact);

// @route GET api/contact/get-all
// @desc get all contacts
// @access Private
router.get('/get-all', verifyToken, getAllContact);

// @route GET api/contact/get-one/:id
// @desc get a contact
// @access Private
router.get('/get-one/:id', verifyToken, getOneContact);

// @route PUT api/contact/update/:id
// @desc update contact
// @access Private
router.put('/update/:id', verifyToken, updateContact);

// @route POST api/contact/delete/:id
// @desc delete contact
// @access Private
router.delete('/delete/:id', verifyToken, deleteContact);

module.exports = router;
