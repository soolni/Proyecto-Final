// Modules
const productModel = require('../models/productModel');
const path = require('path');

// Functions
const getProducts = async (req, res) => {
    const filePath = path.join(__dirname, "..", "cats_products", `${req.params.id}`);
    console.log(filePath)

    try {
        const result = await productModel.getProducts(filePath);
        res.status(200).json(JSON.parse(result))
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
};

const getPublishMsg = async (req, res) => {
    const filePath = path.join(__dirname, "..", "sell", "publish.json");

    try {
        const result = await productModel.getPublishMsg(filePath);
        res.status(200).json(JSON.parse(result))
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
};

const getProduct = async (req, res) => {
    const filePath = path.join(__dirname, "..", "products", `${req.params.id}`);

    try {
        const result = await productModel.getProduct(filePath);
        res.status(200).json(JSON.parse(result))
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
};

const getProductComment = async (req, res) => {
    const filePath = path.join(__dirname, "..", "products_comments", `${req.params.id}`);

    try {
        const result = await productModel.getProductComment(filePath);
        res.status(200).json(JSON.parse(result))
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
};

// Exports
module.exports = {
    getProducts,
    getPublishMsg,
    getProduct,
    getProductComment
};