const express = require('express');
const verifyToken = require('../middleware/auth');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Authenticate access
// router.use(verifyToken);

// @route POST/GET api/contact/
// @desc create contact or get all contacts
// @access Private
router
  .route('/')
  .post(contactController.createContact)
  .get(contactController.getContacts);

// @route GET/PUT/DELETE api/contact/:id
// @desc get, update, or delete a contact
// @access Private
router
  .route('/:id')
  .get(contactController.getContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
