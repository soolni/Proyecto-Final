// Modules 
const categoryModel = require('../models/categoryModel');
const path = require('path');

// Functions
const getCategories = async (req, res) => {
    const filePath = path.join(__dirname, "..", "cats", "cat.json");

    try {
        const result = await categoryModel.getCategories(filePath);
        res.status(200).json(result)
    } catch (err) {
        console.log("Categories error:", err)
        res.status(500).json({message: "Internal server error"})
    }
};

module.exports = {
    path,
    getCategories
};