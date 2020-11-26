const route = require('express').Router()
const Controller = require('../controllers/controller')

route.get('/quotes', Controller.quotesFigure)


module.exports = route