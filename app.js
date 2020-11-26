const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')



app.use(express.urlencoded({extended: true}))

app.use('/', route)


app.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})