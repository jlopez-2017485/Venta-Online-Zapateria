'use strict'

const Product = require('../models/product.model');
const {validateData, checkUpdate} = require('../utils/validate');

exports.test = (req, res)=>{
    return res.send({message: 'Function test is running'});
}

exports.saveProduct = async(req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name,
            precio: params.precio,
            stock: params.stock,
            category: params.category
        };
        const msg = validateData(data);
        if(!msg){
            const product = new Product(data);
            await product.save();
            return res.send({message: 'Producto guardado'})
        }else{
            return res.status(400).send(msg);
        }

    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.getProducts = async (req, res)=>{
    try {
        const productos = await Product.find();
        return res.send({productos});
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.searchProduct = async (req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validateData(data);
        if (!msg) {
            const product = await Product.find({name: {$regex:params.name, $options: 'i'}});
            return res.send({product});
        }else{
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.updateProduct = async(req, res)=>{
    try {
        const params = req.body;
        const productId = req.params.id;
        const checkUpdt = await checkUpdate(params);
        if (checkUpdt === false) {
            return res.status(400).send({message: 'No se han recibido datos'});
        }else{
            const updateProduct = await Product.findOneAndUpdate({_id: productId}, params, {new: true});
            return res.send({updateProduct, message: 'Se ha actulizado el producto'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.deleteProduct = async(req, res)=>{
    try {
        const productId = req.params.id;
        const productDeleted = await Product.findOneAndDelete({_id: productId});
        if (productDeleted) {
            return res.send({productDeleted, message: 'Producto eliminado'});
        }else{
            return res.send({message:'No se ha encontrado el producto'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}