// Modules 
const cartModel = require('../models/cartModel');
const path = require('path');

// Functions
const getCartProduct = async (req, res) => {
    const filePath = path.join(__dirname, "..", "user_cart", `${req.params.id}`);

    try {
        const result = await cartModel.getCartProduct(filePath);
        res.status(200).json(JSON.parse(result))
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
};

const postCartProducts = async (req, res) => {
    const msgFilePath = path.join(__dirname, "..", "cart", "buy.json");
    const cartFilePath = path.join(__dirname, "..", "cartProducts.json");
    console.log(cartFilePath);

    try {
        const result = await cartModel.postCartProducts(msgFilePath, cartFilePath, req.body)
        res.status(200).json(JSON.parse(result))
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
};

// Exports
module.exports = {
    getCartProduct,
    postCartProducts
};