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
  phoneNumber: {
    type: String,
    trim: true
  },
  job: {
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
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users',
  //   required: [true, 'A contact must have an owner']
  // },
  lastViewed: {
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
