import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'

const Login = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    props.loginUser(username.value, password.value)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input {...username} />
        </div>
        <div>
          salasana
          <input {...password} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default connect(null, { loginUser })(Login)