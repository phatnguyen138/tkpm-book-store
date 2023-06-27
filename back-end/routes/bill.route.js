const express = require('express');
const billRoute = express.Router();
const billController = require('../controllers/bill.controller');

// Routes
billRoute.get('/', billController.getBills);
billRoute.get('/:id', billController.getBillById);
billRoute.post('/', billController.createBill);
billRoute.put('/:id', billController.updateBill);
billRoute.delete('/:id', billController.deleteBill);

module.exports = billRoute;
