// Modules
const fs = require('fs');
const path = require('path');

// Function
const getCredentials = () => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "..", "login.json");
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
    getCredentials
};