const express = require('express');
// const verifyToken = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Authentication access
// router.use(verifyToken);

// @route POST|GET api/categories/create
// @desc create category or get categories
// @access Private
router
  .route('/')
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategories);

// @route GET|PUT|DELETE api/categories/:id
// @desc get, update, or delete a category
// @access Private
router
  .route('/:id')
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
