const express = require('express')
require('dotenv').config()
const session = require('express-session')
const bcrypt = require('bcrypt')
const app = express()
const path = require('path')
// // Database Configuration
// const mongoose = require('./config/db')

// Set the Port Configuration
const port = process.env.PORT ? process.env.PORT : '3000'

// Require Middleware
const methodOverride = require('method-override')
// const morgan = require('morgan')
// const passUserTOView = require('./middleware/pass-user-to-view')
// const User = require('./models/user')


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use('/uploads', express.static('public/uploads'))

// Use Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(passUserTOView)
app.use(methodOverride('_method'))
// app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// Sesstion Configurations
app.get('/', async (req, res) => {
  res.render('index.ejs')
})

// Require Routes
// const authRouter = require('./routes/auth')
// const movieRouter = require('./routes/moiveRoute')

// //Use Routes
// app.use('/auth', authRouter)

// app.use('/movies', movieRouter)

app.listen(port)