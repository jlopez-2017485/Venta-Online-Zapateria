'use strict'

const carShopController = require('../controllers/carShop.controller');
const express = require('express');
const mdAuth = require('../services/authenticated');
const api = express.Router();

api.post('/saveCarShop', mdAuth.ensureAuth, carShopController.saveCarShop);

module.exports = api;