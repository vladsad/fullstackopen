import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import BlogCreation from './components/BlogCreation'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import Login from './components/Login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { logoutUser, initUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    props.initUser()
    props.initializeUsers()
  }, [])

  const handleLogout = () => {
    props.logoutUser()
  }

  const user = props.user

  const navitemStyle = {
    paddingRight: 5
  }

  const navStyle = {
    padding: 5,
    backgroundColor: 'lightgray'
  }

  return (
    <div>
      <Router>
        <div>
          <div style={navStyle}>
            <Link style={navitemStyle} to='/'>blogs</Link>
            <Link style={navitemStyle} to='/users'>users</Link>
            {user ? (<span>
              <span style={navitemStyle}>{user.name} logged in</span>
              <button style={navitemStyle} onClick={handleLogout}>logout</button>
            </span>):null }
          </div>

          <h2>blog app</h2>
          <Notification />

          {user?<div>
            <div>
              <Route exact path="/" render={() => <div>
                <BlogCreation />
                <Blogs />
              </div>} />
              <Route exact path="/users" render={() =>
                <Users />
              } />
              <Route path="/users/:id" render={({ match }) =>
                <User id={match.params.id} />
              } />
              <Route path="/blogs/:id" render={({ match }) =>
                <Blog id={match.params.id} />
              } />
            </div>
          </div>:<div>
            <Login />
          </div>}
        </div>
      </ Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  setNotification,
  initializeBlogs,
  logoutUser,
  initUser,
  initializeUsers
})(App)