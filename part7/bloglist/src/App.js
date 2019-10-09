import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, updateBlog, addBlog, removeBlog } from './reducers/blogReducer'
import { tryLogin, setLogin } from './reducers/loginReducer'


const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')
  // const [user, setUser] = useState(null)

  useEffect(() => {
    props.initBlogs()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setLogin(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    props.setNotification({ message, type },  5)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = props
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    props.addBlog(blog)
    newBlogRef.current.toggleVisibility()
    notify(`a new blog ${blog.title} by ${blog.author} added`)
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    props.updateBlog(likedBlog)
    notify(`blog ${likedBlog.title} by ${likedBlog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification/>

        <form onSubmit={handleLogin}>
          <div>
            login
            <input {...username}/>
          </div>
          <div>
            password
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  return (
    <div>
      <h2>blogs</h2>

      <Notification/>

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {props.visibleBlogs.map(blog => {
        return <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={user}
          creator={blog.user.username === user.username}
        />
      }
      )}
    </div>
  )
}

const blogsToShow = ({ blogs }) => {
  if(!blogs || blogs.length === 0) {
    return []
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return blogs.sort(byLikes)
}

const mapStateToProps = (state) => {
  return {
    visibleBlogs: blogsToShow(state)
  }
}

const mapDispatchToProps = {
  initBlogs,
  setNotification,
  updateBlog,
  addBlog,
  removeBlog,
  tryLogin,
  setLogin,
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default ConnectedApp
