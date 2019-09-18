import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlogsAfterDeleteOne }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    cursor: 'pointer'
  }

  const [blogState, setBlogState] = useState(blog)

  const [expanded, setExpanded] = useState(false)

  const expandedStyle = { display: expanded ? 'block' : 'none' }

  const increaseLike = () => {
    blogService
      .update({ ...blogState, likes : blogState.likes+1 })
      .then(returnedBlog => {
        setBlogState(returnedBlog)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBlog = () => {
    if (window.confirm(`remove blog ${blogState.title}`)) {
      blogService
        .remove(blogState.id)
        .then(() => {
          updateBlogsAfterDeleteOne(blogState.id)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const removeButton = () => {
    if('user' in blog && blog.user.username === user.username) {
      return (<button onClick={deleteBlog}>remove</button>)
    }
  }


  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)}>
        {blogState.title} {blogState.author}
      </div>
      <div style={expandedStyle}>
        <a href="##">
          {blogState.url}
        </a>
        <br/>
        {blogState.likes} <button onClick={increaseLike}>like</button>
        <br/>
        added by {blogState.author}
        <br/>
        {removeButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlogsAfterDeleteOne: PropTypes.func.isRequired,
}

export default Blog