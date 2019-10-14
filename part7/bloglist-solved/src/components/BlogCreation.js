import React from 'react'
import { connect } from 'react-redux'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'


const BlogCreation = (props) => {
  const createBlog = async (blog) => {
    props.createBlog(blog)
    newBlogRef.current.toggleVisibility()
    props.setNotification(`a new blog ${blog.title} by ${blog.author} added`)
  }

  const newBlogRef = React.createRef()

  return (
    <Togglable buttonLabel='create new' ref={newBlogRef}>
      <NewBlog createBlog={createBlog} />
    </Togglable>
  )
}



export default connect(null, {
  createBlog, setNotification
})(BlogCreation)