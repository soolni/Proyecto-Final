// Modules
const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

//
router.get('/cats/cat.json', categoriesController.getCategories);

// Exports
module.exports = router;