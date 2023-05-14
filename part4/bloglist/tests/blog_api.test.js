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

describe('when there is initally some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(helper.initialBlogs[0].title)
  })
  test('blog posts have a defined ID', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => {
      expect(blog.id).toBeDefined()
    })
  }, 100000)
})

describe('addition of a new blog', () => {
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
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd)
      .toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      ...blogToUpdate,
      likes: 69
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd[0].likes).toEqual(69)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})