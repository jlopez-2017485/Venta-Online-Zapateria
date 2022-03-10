'use strict'

const productController = require('../controllers/product.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/test', productController.test);

api.post('/saveProduct', [mdAuth.ensureAuth, mdAuth.isAdmin],productController.saveProduct);
api.get('/searchProducts', mdAuth.ensureAuth, productController.getProducts);
api.get('/searchProduct', mdAuth.ensureAuth, productController.searchProduct);
api.put('/updateProduct/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productController.updateProduct);
api.delete('/deleteProduct/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productController.deleteProduct);

module.exports = api;
