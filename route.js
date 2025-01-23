const express = require('express')
const routes = express.Router()
const func = require('./controllers/validacoes')

routes.get('/validacao/:numero', func.validando_numero)
routes.get('/reunindo/dados/:numero', func.formatandoDados)

module.exports = routes