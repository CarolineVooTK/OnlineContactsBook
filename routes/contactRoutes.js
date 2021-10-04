const express = require('express');
// const verifyToken = require('../middleware/auth');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Authenticate access
// router.use(verifyToken);

// @route POST/GET api/contacts/
// @desc create contact or get all contacts
// @access Private
router
  .route('/')
  .post(contactController.createContact)
  .get(contactController.getAllContacts);

// @route GET/PUT/DELETE api/contacts/:id
// @desc get, update, or delete a contact
// @access Private
router
  .route('/:id')
  .get(contactController.getContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
