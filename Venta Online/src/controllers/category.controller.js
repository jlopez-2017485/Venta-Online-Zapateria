'use strict'

const Category = require('../models/category.model');
const Product = require('../models/product.model');
const { validateData, checkUpdate } = require('../utils/validate');

exports.saveCategory = async(req, res)=>{
    try {
        const params = req.body;
        const data ={
            name: params.name
        };
        const msg = validateData(data);
        if (!msg) {
            const category = new Category(data);
            await category.save();
            return res.send({message: 'Categoría guardada'});
        }else{
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.getCategory = async(req, res)=>{
    try {
        const categories = await Category.find();
        return res.send({categories});
    } catch (err) {
        console.log(err);
        return err;
    }
}   

exports.searchCategory = async(req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validateData(data);
        if (!msg) {
            const category = await Category.find({name: {$regex:params.name, $options: 'i'}});
            return res.send({category});
        }else{
            return res.status(400).send(msg);
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.updateCategory = async(req, res)=>{
    try {
        const params = req.body;
        const categoryId = req.params.id;
        const checkUpdt = await checkUpdate(params);
        if (checkUpdt === false) {
            return res.status(400).send({message: 'No se han recibido datos'});
        }else{
            const updateCategory = await Category.findOneAndUpdate({_id: categoryId}, params, {new: true});
            return res.send({updateCategory, message: 'Se ha actualizado la categoría'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.deleteCategory = async(req, res)=>{
    try {
        const categoryDflt = await Category.findOne({name: 'Default'});
        const categoryId = req.params.id;
        const categoryExist = await Category.findOne({_id: categoryId});
        if (categoryExist){
            const productCategory = await Category.find({category:categoryId});
            if(!productCategory){
                await Category.findOneAndDelete({_id:categoryId});
                return res.send({message:'Categoría eliminada'});
            }else{
                await Product.updateMany({category:categoryId}, {category:categoryDflt._id},{multi:true});
                await Category.findByIdAndDelete({_id:categoryId});
                return res.send({message:'Categoría eliminada'});
            }
        }else{
            return res.status(404).send('No se ha encontrado la categoria');
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
        /*const categoryDeleted = await Category.findOneAndDelete({_id: categoryId});
        if (categoryDeleted) {
            return res.send({categoryDeleted, message: 'Categoría eliminada'});
        }else{
            return res.send({message: 'No se ha encontrado la categoria'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}*/