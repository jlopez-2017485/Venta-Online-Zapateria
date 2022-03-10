'use stritc'

const mongoose = require('mongoose');

const FactureSchema = mongoose.Schema({
    quantity: Number,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.ObjectId, ref: 'Product'}
});

module.exports = mongoose.model('Facture', FactureSchema);