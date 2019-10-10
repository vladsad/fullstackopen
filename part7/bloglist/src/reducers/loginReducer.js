import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'TRY_LOGIN':
    return action.data
  case 'SET_LOGIN':
    return action.data
  case 'UNSET_LOGIN':
    return null
  default:
    return state
  }
}

export const tryLogin = (user) => {
  return async dispatch => {
    const loggedUser = await loginService.login(user)
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

export const loginOut = () => {
  return async dispatch => {
    dispatch({
      type: 'UNSET_LOGIN',
    })
  }
}

export default reducer