import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      console.log(username, password)

      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    } catch(e) {
      dispatch({
        type: 'SET_NOTIFICATION',
        content: {
          message: 'wrong username of password', 
          type: 'error'
        },
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        })
      }, 5000)
    }

  }
}

export default reducer