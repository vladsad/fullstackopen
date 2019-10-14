import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog, commentBlog } from '../reducers/blogsReducer'
import { useField } from '../hooks'

const Blog = (props) => {
  if (props.blog === undefined) {
    return null
  }
  const likeBlog = async (blog) => {
    props.updateBlog({ ...blog, likes: blog.likes + 1 })
    props.setNotification(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      props.setNotification(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  const { blog } = props

  const [comment, commentReset] = useField('text')

  const addComment = async (event) => {
    event.preventDefault()
    props.commentBlog(blog, comment.value)
    commentReset()
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>

      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {props.creator && (<button onClick={() => removeBlog(blog)}>remove </button>)}

      <h3>comments</h3>

      <form onSubmit={addComment}>
        <input {...comment}/>
        <button type='submit'>add comment</button>
      </form>

      {blog.comments &&
         <ul>
         {blog.comments.map(comment =>
           <li key={comment}>
             {comment}
           </li>
         )}
       </ul>
      }
     
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const blog = state.blogs.find(blog => blog.id === ownProps.id)
  return {
    blog,
    creator: blog && blog.user.username === state.user.username
  }
}

export default connect(mapStateToProps, {
  removeBlog, updateBlog, commentBlog, setNotification
})(Blog)