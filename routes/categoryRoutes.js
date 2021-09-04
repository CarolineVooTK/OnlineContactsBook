const express = require('express');
const verifyToken = require('../middleware/auth');
const {
  createCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

// @route POST api/category/create
// @desc create category
// @access Private
router.post('/create', verifyToken, createCategory);

// @route GET api/category/get-all
// @desc get all categorys
// @access Private
router.get('/get-all', verifyToken, getAllCategory);

// @route GET api/category/get-one/:id
// @desc get a category
// @access Private
router.get('/get-one/:id', verifyToken, getOneCategory);

// @route PUT api/category/update/:id
// @desc update category
// @access Private
router.put('/update/:id', verifyToken, updateCategory);

// @route POST api/category/delete/:id
// @desc delete category
// @access Private
router.delete('/delete/:id', verifyToken, deleteCategory);

module.exports = router;
