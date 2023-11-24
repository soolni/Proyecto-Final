// Modules
const fs = require('fs');
const util = require('util');

// Functions 
const getCartProduct = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const postCartProducts = async (msgFilePath, cartFilePath, products) => {
    const cartProducts = JSON.stringify(products);
    console.log(products);

    try {
        await writeFile(cartFilePath, cartProducts);

        const data = await readFile(msgFilePath, 'utf8');
        return data;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getCartProduct,
    postCartProducts
};