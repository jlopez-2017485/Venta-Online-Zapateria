'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('../src/routes/user.routes');
const productRoutes = require('../src/routes/product.routes');
const categoryRoutes = require('../src/routes/category.routes');
const carShopRoutes = require('../src/routes/carShop.routes');
const factureRoutes = require('../src/routes/facture.routes');

const app = express();

app.use(helmet()); /*seguridad del servidor*/ 
app.use(bodyParser.urlencoded({extended: false})); /*No sé encrypte la url*/
app.use(bodyParser.json()); /*Que voy a utilizar el formato json o lo va a convertir*/
app.use(cors()); /*Responda las solicitudes*/

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/carShop', carShopRoutes);
app.use('/facture', factureRoutes);

module.exports = app