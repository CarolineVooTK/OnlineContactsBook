const Category = require('../models/Category');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    message: { categories }
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({
      status: 'fail',
      message: 'Category not found'
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: { category }
    });
  }
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { category: newCategory }
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name'
    });
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: name },
    {
      new: true,
      runValidators: true
    }
  );

  if (!category) {
    res.status(404).json({
      status: 'fail',
      message: 'Category not found'
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: { category }
    });
  }
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const contact = await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: { contact }
  });
});
