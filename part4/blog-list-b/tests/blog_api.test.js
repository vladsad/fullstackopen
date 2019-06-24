const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  jest.setTimeout(20000)
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
//   const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
//   const promiseArray = blogObject.map(blog => blog.save())
//   await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs database contain id property', async () => {

  const getRandomBlog = (data) => {
    const index = Math.floor(Math.random() * data.length)
    return data[index]
  }

  const response = await api.get('/api/blogs')

  expect(getRandomBlog(response.body).id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'React or Angular?',
    author: 'Vladislav Sadretdinov',
    url: 'https://wwwwwwwwwww.com/',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(newBlog.title)
})

test('blog without likes added with default prop 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Hacker',
    url: 'https://wwwwwwwwwww.com/',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(newBlog.title)

  expect(response.body.likes).toBe(0)
})

test('blog without title and url return 400 status code', async () => {
  const newBlog = {
    author: 'My mother'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('delete one blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('update one blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  blogToUpdate.url = 'www.testupdateoneblog.com'

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length
  )

  const urls = blogsAtEnd.map(b => b.url)
  expect(urls).toContain(blogToUpdate.url)
})

afterAll(() => {
  mongoose.connection.close()
})