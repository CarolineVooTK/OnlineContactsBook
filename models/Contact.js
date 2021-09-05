const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A contact must have name'],
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  phone_number: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  category: {
    type: [String],
    default: []
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'A contact must have an owner']
  },
  last_viewed: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('contacts', ContactSchema);

module.exports = Contact;
