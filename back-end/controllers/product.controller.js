const productModel = require('../models/product.model');

const getProducts = async (req, res) => {
    const products = await productModel.findAll();
    return res.status(200).json({
        success: true,
        data: products
    });
};

const getProductById = async (req, res) => {
    const book_id = req.params.id;
    console.log('book id', book_id);
    const product = await productModel.findById(book_id);
    return res.status(200).json({
        success: true,
        data: product
    });
};

module.exports = {
    getProducts,
    getProductById
};
