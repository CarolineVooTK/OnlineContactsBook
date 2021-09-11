const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A category must have a name']
  },
  // color: {
  //   type: String,
  //   required: true,
  //   validate(col) {
  //     return col.startsWith('#', 0) && col.length === 7;
  //   },
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
CategorySchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
const Category = mongoose.model('Categories', CategorySchema);
module.exports = Category;
