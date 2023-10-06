const Blog = require('../models/bloglist')
const User = require('../models/user')

const resetDB = async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
}

module.exports = { resetDB }