const router = require('express').Router()
const { route } = require('.')
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.getPopularMovie)

router.get('/genre', MovieController.findByGenre)

router.get('/search/', MovieController.searchMovie)

router.get('/newsapi', MovieController.getNewsapi)

router.get('/quotes', MovieController.quotesFigure)

router.get('/:id', MovieController.getOneMovie)

module.exports = router