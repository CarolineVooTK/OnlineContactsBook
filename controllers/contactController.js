const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { contact: newContact }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(201).json({
      status: 'success',
      results: contacts.length,
      message: { contacts }
    });
  } catch (err) {
    res.status(501).json({
      status: 'error',
      message: err
    });
  }
};

exports.getContact = async (req, res) => {
  // add logic
  res.status(501).json({
    status: 'error',
    message: 'Route under development.'
  });
};

exports.updateContact = async (req, res) => {
  // add logic
  res.status(501).json({
    status: 'error',
    message: 'Route under development.'
  });
};

exports.deleteContact = async (req, res) => {
  // add logic
  res.status(501).json({
    status: 'error',
    message: 'Route under development.'
  });
};
