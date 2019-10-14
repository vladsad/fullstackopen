import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {props.blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = (state) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes
  return {
    blogs: state.blogs.sort(byLikes)
  }
}

export default connect(mapStateToProps)(Blogs)