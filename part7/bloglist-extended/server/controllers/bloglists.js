const Blog = require('../models/bloglist')

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
}

const getBlogById = async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) response.json(blog)
  else response.status(404).end()
}

const createBlog = async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })
  const savedBlog = await blog.save()
  savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save() 
  response.status(201).json(savedBlog)
}

const deleteBlog = async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({ error: 'blog not found' })
  if (blog.user.toString() !== user.id.toString()) return response.status(401).json({ error: 'only the creator can delete blogs' })
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
}

const updateBlog = async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
  updateBlog
}