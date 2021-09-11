const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A contact must have name'],
    trim: true,
    maxlength: [255, 'A name must have less than or equal to 255 characters'],
    validate: [validator.isAscii, 'Name must only contain ASCII characters']
  },
  email: {
    type: String,
    trim: true,
    maxlength: [255, 'An email must have less than or equal to 255 characters'],
    validate: [validator.isEmail, 'Invalid email ({VALUE})']
  },
  phoneNumber: {
    type: String,
    trim: true,
    maxlength: [
      255,
      'A phone no. must have less than or equal to 255 characters'
    ],
    validate: {
      validator: function (val) {
        return val.match(/^[0-9\-+]+$/);
      },
      message: 'Invalid phone no. ({VALUE})'
    }
  },
  job: {
    type: String,
    trim: true,
    maxlength: [255, 'A job must have less than or equal to 255 characters'],
    validate: [validator.isAscii, 'Job must only contain ASCII characters.']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [
      255,
      'A company must have less than or equal to 255 characters'
    ],
    validate: [validator.isAscii, 'Company must only contain ASCII characters.']
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
    default: Date.now,
    // TODO: to update when getting a contact
    validate: [validator.isDate, 'Invalid date ({VALUE})']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('contacts', ContactSchema);

module.exports = Contact;
