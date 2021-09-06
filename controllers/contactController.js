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

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(req.body);

    res.status(200).json({
      status: 'success',
      results: contacts.length,
      message: { contacts }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      message: { contact }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      message: { contact }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: { contact }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
