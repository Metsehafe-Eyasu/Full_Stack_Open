// Import dependencies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const app = express()

// Import utils
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// Import routes
const usersRouter = require('./routes/users')
const blogRouter = require('./routes/bloglists')
const loginRouter = require('./routes/login')
const testingRouter = require('./routes/testing')

// Connect to mongodb database
mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Middlewares 
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// Routes
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

// Error handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app