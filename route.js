const express = require('express')
const routes = express.Router()
const func = require('./controllers/validacoes')

routes.get('/validacao/:numero', func.validando_numero)

module.exports = routes