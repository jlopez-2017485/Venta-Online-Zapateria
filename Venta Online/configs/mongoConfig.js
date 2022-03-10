'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.init = ()=>{
    const uriMongo = 'mongodb://127.0.0.1:27017/zapateria';

    mongoose.connection.on('error', ()=>{
        console.log('MongoDB | No se pudo conectar a mongodb');
        mongoose.disconnect();
    });
    mongoose.connection.on('connecting', ()=>{
        console.log('MongoDB | Está tratando de conectarse');
    });
    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB | Conectado');
    });
    mongoose.connection.once('open', ()=>{
        console.log('MongoDB | Conectado a la base de datos');
    });
    mongoose.connection.on('reconnected', ()=>{
        console.log('MongoDB | Reconectado con la base de datos');
    });
    mongoose.connection.on('disconnected', ()=>{
        console.log('MongoDB | error, mongodb se ha desconectado');
    });

    mongoose.connect(uriMongo, {
        maxPoolSize: 50,
        useNewUrlParser: true,
        connectTimeoutMS: 2500
    }).catch(err=>console.log(err));
}
