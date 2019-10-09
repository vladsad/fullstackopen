const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    await setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
    })
  }
}

export default reducer