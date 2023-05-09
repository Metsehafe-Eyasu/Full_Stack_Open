const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Bloglist = require('../models/bloglist')

beforeEach(async () => {
  await Bloglist.deleteMany({})
  for (const blog of helper.initialBlogs) {
    const blogObject = new Bloglist(blog)
    await blogObject.save()
  }
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('blog posts have a defined ID', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(blog => {
    expect(blog.id).toBeDefined()
  })
}, 100000)

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
}, 100000)

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'Test Missing like',
    author: 'Test Author',
    url: 'http://testurl.com'
  }
  const blogReturned = await api.post('/api/blogs').send(newBlog)
  expect(blogReturned.body.likes).toEqual(0)
})

test('missing title or url property is invalid', async () => {
  const newBlog = {
    title: 'missing url',
    author: 'Author person',
    likes: 69
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})