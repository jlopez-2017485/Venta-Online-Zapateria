'use strict'

const CarShop = require('../models/carShop.model');
const Product = require('../models/product.model');
const {validateData} = require('../utils/validate');

exports.saveCarShop = async (req, res) => {
    try {
        const idUser = req.user.sub;
        const params = req.body;
        const products = {
            product: params.product,
            quantity: params.quantity
        }
        const msg = validateData(products);
        
        if (!msg) {
            const srchProduct = await Product.findOne({_id: products.product});
            const srch = await CarShop.findOne({user: idUser });
            if(srchProduct.stock > 0){
                if (srch) {
                const update = await CarShop.findOneAndUpdate({ _id: srch.id }, { $push: { products: [{ product: products.product, quantity: products.quantity }] } });
                return res.send({update, message: 'Producto agregado'});
                }else{
                    return res.send({message: 'Producto no se ha agregado al carrito'});
                }
            }
        }else{
            return res.send(msg);
        } 
    } catch (err) {
        console.log(err);
        return err;
    }
}