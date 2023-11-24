// Modules
const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/cats_products/:id', productsController.getProducts);
router.get('/sell/publish.json', productsController.getPublishMsg);
router.get('/products/:id', productsController.getProduct);
router.get('/products_comments/:id', productsController.getProductComment);

// Exports
module.exports = router;