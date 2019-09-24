const initialState = ''

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (message) => {
  return {
    type: 'SET_FILTER',
    data: message
  }
}

export default reducer