'use strict'

const mongoose = require('mongoose');
/*const Product = require('../models/product.model');*/

const categorySchema = mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Category', categorySchema);