'use strict'

const factureController = require('../controllers/facture.controller');
const express = require('express');
const mdAuth = require('../services/authenticated');
const api = express.Router();

api.get('/saveBuy', mdAuth.ensureAuth, factureController.saveBuys);

module.exports = api;