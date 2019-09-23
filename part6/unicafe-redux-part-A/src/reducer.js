const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const reducer = (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'NEUTRAL':
      return {...state, neutral: state.neutral + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'RESET':
      return {...initialState}
    default:
      return state
  }
}

export default reducer