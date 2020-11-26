const axios = require('axios')

class MovieController {
  static getPopularMovie(req, res, next) {
    let listMovie
    let selectedMovie = []
  
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      params: {
        api_key: '9411c374b59217005e6957e25f566990'
      }
    })
  
    .then(movies => {
      listMovie = movies.data.results.map(el =>{
        return {
          id: el.id,
          title: el.title,
          poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
        }
      })
      for (let i = 0; i < 12; i++) {
        selectedMovie.push(listMovie[i])
      }
      console.log('Sampe sini')
      res.status(200).json({movies: selectedMovie})
    })
    .catch(err => {
      next(err)
    })
  }

  static getOneMovie(req, res, next) {
    const id = req.params.id
    axios({
      url: `https://api.themoviedb.org/3/movie/${id}`,
      method: 'get',
      params: {
        api_key: '9411c374b59217005e6957e25f566990'
      }
    })
    .then(result => {
      const { id, title, release_date, overview, vote_average, genres, poster_path  } = result.data
      const movie = {
        id,
        title,
        release_date,
        overview,
        rating: vote_average,
        genres,
        poster_path: 'https://image.tmdb.org/t/p/w342/' + poster_path 
      }
      return res.status(200).json(movie)
    })
    .catch(err => {
      next(err)
    })
  }
  
  static findByGenre(req, res, next) {
    let genre = req.query.genre
    let genreId
    switch (genre) {
      case 'Action':
        genreId = 28
        break;
      case 'Adventure':
        genreId = 12
        break;
      case 'Horror':
        genreId = 27
        break;
      case 'Crime':
        genreId = 80
        break;
      default:
        genre = 'Comedy'
        genreId = 35
        break;
    }
    console.log(genre);
    axios({
      url: 'https://api.themoviedb.org/3/discover/movie',
      method: 'get',
      params: {
        api_key: '9411c374b59217005e6957e25f566990',
        with_genres: genreId,
        'vote_average.gte' : 7
      }
    })
    .then(movies => {
      let listMovie = movies.data.results.map(el =>{
        return {
          id: el.id,
          title: el.title,
          poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
        }
      })
      res.status(200).json({ movie: listMovie})
    })
    .catch(err => {
      next(err)
    })
  }

  static searchMovie(req, res, next) {
    const query = req.query.query || 'a'
    axios({
      url: `https://api.themoviedb.org/3/search/movie`,
      method: 'get',
      params: {
        api_key: '9411c374b59217005e6957e25f566990',
        query: query
      }
    })
    .then(movies => {
      let listMovie = movies.data.results.map(el =>{
        return {
          id: el.id,
          title: el.title,
          poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
        }
      })
      res.status(200).json({ movies: listMovie })
    })
    .catch(err => {
      next(err)
    })
  }
}


module.exports = MovieController