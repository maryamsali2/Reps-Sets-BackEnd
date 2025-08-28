const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt')
const app = express()
const path = require('path')
// // Database Configuration
const mongoose = require('./config/db')

// Set the Port Configuration
const port = process.env.PORT ? process.env.PORT : '3000'

// Require Middleware
const methodOverride = require('method-override')
// const postRouter = require("./routes/postRouter")

const morgan = require('morgan')
// const passUserTOView = require('./middleware/pass-user-to-view')
// const User = require('./models/user')



app.use('/uploads', express.static('public/uploads'))

// Use Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(passUserTOView)
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
// app.use("/posts", postRouter)




// Sesstion Configurations
// app.get('/', async (req, res) => {
//   res.render('index.ejs')
// })

// Require Routes
const authRouter = require('./routes/auth')

// //Use Routes

app.use('/auth', authRouter)

app.listen(port)