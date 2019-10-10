import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  const rows = () => {
    const users = props.blogs.reduce((acc, value) => {
      if(!(value.user.username in acc)) {
        acc[value.user.username] = {
          'name': value.user.name,
          'valueOfBlogs': 1,
          'id': value.user.id
        }
        return acc
      }

      const valueOfBlogs = acc[value.user.username]['valueOfBlogs'] + 1

      acc[value.user.username] = {
        'name': value.user.name,
        valueOfBlogs,
        'id': value.user.id
      }

      return acc
    }, {})

    return(
      Object.values(users)
        .map((val, ind) =>
          <tr key={ind}>
            <td><Link to={'users/' + val.id}>{val.name}</Link></td>
            <td>{val.valueOfBlogs}</td>
          </tr>
        )
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {rows()}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedUsers = connect(
  mapStateToProps,
)(Users)

export default ConnectedUsers