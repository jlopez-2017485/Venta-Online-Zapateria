'use strict'

const Product = require('../models/product.model');
const CarShop = require('../models/carShop.model');

exports.saveBuys = async (req, res) => {
    try {
        const idUser = req.user.sub;
        const carShop = await CarShop.findOne({ user: idUser });

        if (carShop) {
            for (var i = 0; i < carShop.products.length; i++) {
                const idProduct = carShop.products[i].product;
                const quantity = carShop.products[i].quantity;

                const product = await Product.findOne({ _id: idProduct });
                const resta = product.stock - quantity;

                if (resta < 0) return res.send({ message: 'No hay stock' });
                const datA = {
                    stock: resta
                }
                await Product.findOneAndUpdate({ _id: idProduct }, datA, { new: true })
            }
            return res.send({carShop, message: 'Factura realizada'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}