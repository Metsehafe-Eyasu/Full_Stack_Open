const blogRouter = require('express').Router()
const bloglistController = require('../controllers/bloglists')

blogRouter.get('/', bloglistController.getBlogs)

blogRouter.get('/:id', bloglistController.getBlogById)

blogRouter.post('/', bloglistController.createBlog)

blogRouter.delete('/:id', bloglistController.deleteBlog)

blogRouter.put('/:id', bloglistController.updateBlog)

module.exports = blogRouter