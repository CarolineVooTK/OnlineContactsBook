const argon2 = require('argon2');
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  }
});

// Encrypt password if it is modified.
UserSchema.pre('save', async function (next) {
  // Only if password if modified
  if (!this.isModified('password')) return next();

  this.password = await argon2.hash(this.password);
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model('users', UserSchema);
