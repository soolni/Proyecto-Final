// Modules 
const express = require('express');
const cartController = require('../controllers/cartController');
const jwt = require("jsonwebtoken");

const password = require('../sensitiveInfo');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access. Token not provided." });
    }

    jwt.verify(token.slice(7), password.password, (err, decoded) => {
        if (err) {
            console.log("El token es incorrecto")
            return res.status(401).json({ message: "Unauthorized access. Invalid token." });
        }

        req.user = decoded;

        next();
    });
}

const router = express.Router();

router.get('/user_cart/:id', cartController.getCartProduct);
router.post('/cart/buy.json', verifyToken, cartController.postCartProducts);

module.exports = router;
