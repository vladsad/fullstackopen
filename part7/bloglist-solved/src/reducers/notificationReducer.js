const filterReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.content
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = (message, type='success') => {
  const content = {
    message,
    type
  }
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 5000)
  }
}

export default filterReducer