import loginService from '../services/login'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'TRY_LOGIN':
    return action.data
  // case 'UPDATE_BLOG':
  //   return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  // case 'ADD_BLOG':
  //   return [...state, action.data]
  // case 'REMOVE_BLOG':
  //   return state.filter(blog => blog.id !== action.data.id)
  case 'SET_LOGIN':
    return action.data
  default:
    return state
  }
}

export const tryLogin = () => {
  return async dispatch => {
    const loggedUser = await loginService.login()
    dispatch({
      type: 'TRY_LOGIN',
      data: loggedUser,
    })
  }
}

export const setLogin = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_LOGIN',
      data: user
    })
  }
}

export default reducer