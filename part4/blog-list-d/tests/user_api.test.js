const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  jest.setTimeout(20000)
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid user can be added ', async () => {
  const newUser = {
    username: 'testusername',
    name: 'Vladislav Sadretdinov',
    password: 'testpassword'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

test('a invalid username can not be added ', async () => {
  const newUser = {
    username: 'qq',
    name: 'test',
    password: 'testpassword'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).not.toContain(newUser.username)
})

test('a invalid password can not be added ', async () => {
  const newUser = {
    username: 'test',
    name: 'test',
    password: 'tt'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).not.toContain(newUser.username)
})

test('a duplicate username not be added ', async () => {
  const newUser = helper.initialUsers[0]
  delete newUser.passwordHash
  newUser.password = 'test'

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

afterAll(() => {
  mongoose.connection.close()
})