const productRoute = require('express').Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth');

productRoute
    .get('/', productController.getProducts)
    .get('/:id', verifyToken, productController.getProductById);
// .post('/', productController.signin)
// .put('/', productController.signin)
// .delete('/', productController.signin);

module.exports = productRoute;
