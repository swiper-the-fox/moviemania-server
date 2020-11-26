const axios = require('axios')


class Controller {
    static quotesFigure(req, res, next) {
        axios({
            url: 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
            method: 'GET'
        })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            next(err)
        })
    }
}


module.exports = Controller