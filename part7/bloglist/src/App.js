import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from './hooks'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initBlogs, updateBlog, addBlog, removeBlog } from './reducers/blogReducer'
import { tryLogin, setLogin, loginOut } from './reducers/loginReducer'

import Blog from './components/Blog'
import blogService from './services/blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'


const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    if(props.login) {
      props.initBlogs()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setLogin(user)
      blogService.setToken(user.token)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(props.login) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(props.login))
      blogService.setToken(props.login.token)
      props.initBlogs()
    } else {
      blogService.destroyToken()
      window.localStorage.removeItem('loggedBlogAppUser')
      notify(null)
    }
    // eslint-disable-next-line
  }, [props.login])

  const notify = (message, type = 'success') => {
    if(message === null) {
      props.removeNotification()
    } else {
      props.setNotification({ message, type },  5)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.tryLogin({
        username: username.value,
        password: password.value
      })
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    props.loginOut()
  }

  const createBlog = (blog) => {
    props.addBlog(blog)
    newBlogRef.current.toggleVisibility()
    notify(`a new blog ${blog.title} by ${blog.author} added`)
  }

  const likeBlog = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    props.updateBlog(likedBlog)
    notify(`blog ${likedBlog.title} by ${likedBlog.author} liked!`)
  }

  const removeBlog = (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  if (props.login === null) {
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
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const blogListRender = () => {
    return (
      <>
        <Togglable buttonLabel='create new' ref={newBlogRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>

        {props.visibleBlogs.map(blog => {
          return <Blog
            key={blog.id}
            blog={blog}
            like={likeBlog}
            remove={removeBlog}
            user={props.login}
            creator={blog.user.username === props.login.username}
          />
        }
        )}
      </>
    )
  }

  const blogsByUser = (index) => {
    return props.visibleBlogs.filter(blog => {
      return blog.user.id === index
    })
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>

        <Notification/>

        <p>{props.login.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <Route exact path="/" render={() => blogListRender()} />
        <Route exact path="/users" render={() => <Users/>} />
        <Route exact path="/users/:id"
          render={({ match }) => <User blogs={blogsByUser(match.params.id)} />}
        />
      </div>
    </Router>
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
    visibleBlogs: blogsToShow(state),
    login: state.login
  }
}

const mapDispatchToProps = {
  initBlogs,
  setNotification,
  removeNotification,
  updateBlog,
  addBlog,
  removeBlog,
  tryLogin,
  setLogin,
  loginOut,
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default ConnectedApp
