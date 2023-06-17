const productRoute = require('express').Router();
const productController = require('../controllers/product.controller');

productRoute
    .get('/', productController.getProducts)
    .get('/:id', productController.getProductById);
// .post('/', productController.signin)
// .put('/', productController.signin)
// .delete('/', productController.signin);

module.exports = productRoute;
