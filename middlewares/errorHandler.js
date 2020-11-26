module.exports = (err, req, res, next) => {
  // console.log(err)
  if (err.status) {
    //handle error yg di throw
    res.status(err.status).json(err.message)

  } else if (err.name === 'SequelizeValidationError') {
    //handle error dari validasi
    const errors = err.errors.map((e) => e.message)
    res.status(400).json({ message: errors })

  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: `Email is already taken`})
  } else if (err.message === 'Request failed with status code 404') {
    res.status(404).json({ message: `Movie not found`})
  } else { 
    //handle error
    // console.log(err)
    res.status(500).json({ message: "internal server error" })
  }
}