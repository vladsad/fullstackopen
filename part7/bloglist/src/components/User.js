import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  const rows = () => props.blogs.map((blog,index) => {
    return <li key={index}>{blog.title}</li>
  })

  return(
    <>
    <h2>{props.user}</h2>
    <h3>Added blogs</h3>
    <ul>
      {rows()}
    </ul>
    </>
  )
}

const getUserName = (blogs) => {
  if(blogs[0] && blogs[0].user)
    return blogs[0].user.username
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: ownProps.blogs,
    user: getUserName(ownProps.blogs)
  }
}

const ConnectedUser = connect(
  mapStateToProps,
)(User)

export default ConnectedUser