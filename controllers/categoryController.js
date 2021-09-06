const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { category: newCategory }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'success',
      results: categories.length,
      message: { categories }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getCategory = async (req, res) => {
  // add logic
  res.status(501).json({
    status: 'error',
    message: 'route under development'
  });
};

exports.updateCategory = async (req, res) => {
  // add logic
  res.status(501).json({
    status: 'error',
    message: 'route under development'
  });
};

exports.deleteCategory = async (req, res) => {
  // add logic
  res.status(501).json({
    status: 'error',
    message: 'route under development'
  });
};
