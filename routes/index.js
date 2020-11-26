const express = require("express");
const router = express.Router() ;
const movieRouter = require('./movieRoute')
const UserController = require('../controllers/UserController');
const FavoriteController = require('../controllers/FavoriteController');
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authentication);
router.use('/movies', movieRouter);
router.post("/favorites", FavoriteController.addFavMovie);
router.get("/favorites", FavoriteController.showFavMovie);
router.delete("/favorites/:id", authorization, FavoriteController.deleteFavMovie);

module.exports = router
