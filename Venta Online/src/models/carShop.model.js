'use strict'

const mongoose = require('mongoose');

const carShopSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    products: [{compras: 
        {type: mongoose.Schema.ObjectId, ref: 'Product'},
        quantity: Number
        }
    ] 
});

module.exports = mongoose.model('CarShop', carShopSchema);

/*const carShopSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    products: [{compras:
        {idProduct: {type: mongoose.Schema.ObjectId, ref: 'Product'},
        name: String,
        precio: Number,
        quantity: Number,
        subtotal: Number
        }
    }],
        total: Number
})*/

