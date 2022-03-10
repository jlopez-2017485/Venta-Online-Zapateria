'use strict'

const jwt = require('jwt-simple');
/*const moment = require('moment');*/
const secretKey = 'datoRandom';

exports.ensureAuth = (req, res, next)=>{
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'La petición no contiene la cabecera de autenticación'});
    }else{
        try {
            let token = req.headers.authorization.replace(/['"]+/g, '');
            var payload = jwt.decode(token, secretKey);
            /*if (payload.exp <= moment().unix()) {
                return res.status(403).send({message: 'Sesión expirada'});
            }*/
        } catch (err) {
            console.log(err);
            return res.status(403).send({message: 'No es valido el Token'});
        }
         req.user = payload;
         next();
    }
}

exports.isAdmin = async(req, res, next)=>{
    try {
        const user = req.user;
        if (user.role === 'ADMIN') {
            next();
        }else{
            return res.status(403).send({message: 'Usuario sin autorización'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}