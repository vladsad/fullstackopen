import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [newBlog, setNewBlog] = useState({
    "title": '',
    "author": '',
    "url": '',
  })

  const [notification, setNotification] = useState([null, 'default'])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateNotification = (message) => {
    const [text, type] = message
    setNotification([text, type])

    setTimeout(() => {
      setNotification([null, 'default'])
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      updateNotification(['Succesful login', 'success'])
    } catch (exception) {
      updateNotification(['Wrong username or password', 'error'])
    }
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      like: newBlog.like || 0
    }
    
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({
          "title": '',
          "author": '',
          "url": '',
        })
        updateNotification([`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success'])
      })
      .catch(error => {
        updateNotification([error, 'error'])
      })
  }

  const noteForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
          <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({target}) => setNewBlog({...newBlog, title : target.value})}
          />
      </div>
      <div>
        author
          <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({target}) => setNewBlog({...newBlog, author : target.value})}
          />
      </div>
      <div>
        url
          <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({target}) => setNewBlog({...newBlog, url : target.value})}
          />
      </div>
      <button type="submit">create</button>
      <br/><br/>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser');
  }

  if(user == null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>{ user.name } logged in <button onClick={logout}>logout</button></div>
      <h2>create new</h2>
      {noteForm()}
      {
        blogs.map(
          blog => <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  )
}

export default App;
