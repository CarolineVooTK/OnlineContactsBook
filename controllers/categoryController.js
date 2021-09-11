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
  try {
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
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).json({
        status: 'fail',
        message: 'Category not found'
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name'
    });
  }
  try {
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
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).json({
        status: 'fail',
        message: 'Category not found'
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const contact = await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: { contact }
    });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).json({
        status: 'fail',
        message: 'Category not found'
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  }
};
