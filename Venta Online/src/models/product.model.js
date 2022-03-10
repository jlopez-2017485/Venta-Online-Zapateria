'use strict'

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    precio: Number,
    stock: Number,
    category: {type: mongoose.Schema.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Product', productSchema);