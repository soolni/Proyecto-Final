// Module
const fs = require('fs');

// Functions
const getCategories = (filePath) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err) 
            } else {
                resolve(JSON.parse(data))
            }
        })
    })
};

// Exports
module.exports = {
    fs,
    getCategories
};