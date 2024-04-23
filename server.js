const express = require('express')
const db = require('./db')
const MenuItem = require('./models/MenuItem')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(bodyParser.json()) // req.body

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is running on port 3000')
})

app.get('/', (req, res) => {
    res.send('Welcome to my hotel... How i can help you ?')
})

app.get('/paneer', (req, res) => {
    res.send('Take it your paneer tikka !')
})

// import the person router files
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
// use the router file
app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)
