// Modules
const loginModel = require('../models/loginModel');
const jwt = require('jsonwebtoken');
const JWTpassword = require('../sensitiveInfo');

// Function
const getCredentials = async (req, res) => {
    const { username, password } = req.body;
    const credentials = await loginModel.getCredentials();

    try {
        if (username === credentials.username && password === credentials.password) {
           const payload = {
            username: username,
            role: "user"
           } 

           const token = jwt.sign(payload, JWTpassword.password);

           res.status(200).json({token});
        } else {
            res.status(401).json({message: "Incorrect username or password"})
        }
    } catch (err) {
       res.status(500).json({message: "Internal server error"}) 
    }
};

// Exports
module.exports = {
    getCredentials
};