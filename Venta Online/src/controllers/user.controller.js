'use strict'

const User = require('../models/user.model');
const CarShop = require('../models/carShop.model');
const {validateData, searchUser, encrypt, checkPassword,
        checkPermission, checkUpdate} = require('../utils/validate');
const jwt = require('../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Function test is running'});
}
exports.registerAdmin = async (req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name,
            surname: params.surname,
            username: params.username,
            email: params.email,
            password: params.password,
            role: params.role
        }

        const msg = validateData(data);

        if(!msg){
            let userExist = await searchUser(params.username);
            if(!userExist){
                data.surname = params.surname;
                data.password = await encrypt(params.password);

                let user = new User(data);
                await user.save ();
                return res.send({message:'Administrador creado satisfactoriamente'});
            }else{
                return res.send({message:'El nombre de usuario ya esta en uso, elige otro'}); 
            }
        }else{
            return res.status(400).send(msg);
        }

    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.register = async (req, res)=>{
    try {
        const params = req.body;
        const data = {
            name: params.name,
            surname: params.surname,
            username: params.username,
            email: params.email,
            password: params.password,
            role: 'CLIENTE'
        }

        const msg = validateData(data);

        if(!msg){
            let userExist = await searchUser(params.username);
            if(!userExist){
                data.surname = params.surname;
                data.password = await encrypt(params.password);

                let user = new User(data);
                await user.save ();
                const users = await User.findOne({username: params.username});
                console.log({users})
                const datA = {
                    user: users.id
                }
                let carShop = new CarShop(datA);
                await carShop.save();
                return res.send({message:'Usuario creado satisfactoriamente'});
            }else{
                return res.send({message:'El nombre de usuario ya esta en uso, elige otro'}); 
            }
        }else{
            return res.status(400).send(msg);
        }

    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.login = async(req, res)=>{
    try {
        const params = req.body;
        const data = {
            username: params.username,
            password: params.password
        }
        let msg = validateData(data);
        if(!msg){
            let userExist = await searchUser(params.username);
            if (userExist && await checkPassword(params.password, userExist.password)){
                const token = await jwt.createToken(userExist);
                return res.send({token, message:'Sesión iniciada'});
            }else{
                return res.send({message: 'Usuario o contraseña incorrecta'});
            }
        }else{
            return res.status(400).send({msg});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.update = async(req, res)=>{
    try {
        const userId = req.params.id;
        const params = req.body;
        const permission = await checkPermission(userId, req.user.sub);
        if (permission === false){
            return res.status(401).send({message: 'Acción no autorizada'});
        }else{
            const notUpdated = await checkUpdate(params);
            if (notUpdated === false){
                return res.status(400).send({message: 
                                            'Los parametros enviados solo puede actualizarlos un Administrador'});
            }else{
                const already = await searchUser(params.username);
            if(!already){               
                const userUpdated = await User.findOneAndUpdate({_id: userId}, params, {new: true})
                .lean();
                userUpdated.password = await encrypt(userUpdated.password);
                return res.send({userUpdated, message: 'Usuario actualizado'});
            }else{
                return res.send({message:'El nombre de Usuario ya está tomado'});
            }
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.delete = async(req, res)=>{
    try {
        const userId = req.params.id;
        const permission = await checkPermission(userId, req.user.sub);
        if (permission === false) {
            return res.status(403).send({message: 'Acción no autorizada'});
        }else{
            const userDeleted = await User.findOneAndDelete({_id: userId});
            if (userDeleted) {
                return res.send({userDeleted, message: 'Cuenta eliminada'});
            }else{
                return res.send({message: 'Usuario no encontrado o ya ha sido eliminado'}); 
            }        
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}