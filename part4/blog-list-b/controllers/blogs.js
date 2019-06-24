const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(note => note.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (body.url === undefined || body.likes === undefined
    || body.author === undefined || body.title === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
  }

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(result.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter