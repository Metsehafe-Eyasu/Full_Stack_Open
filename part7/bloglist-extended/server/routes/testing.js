const testingRouter = require('express').Router()
const testingController = require('../controllers/testing')

testingRouter.post('/reset', testingController.resetDB)

module.exports = testingRouter