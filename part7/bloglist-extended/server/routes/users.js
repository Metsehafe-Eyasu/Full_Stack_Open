const usersRouter = require('express').Router()
const usersController = require('../controllers/users')

usersRouter.get('/', usersController.getUsers)

usersRouter.post('/', usersController.createUser)

module.exports = usersRouter