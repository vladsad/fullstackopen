import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_ANECDOTES':
    return action.data
  case 'UPDATE_ANECDOTE':
    return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
  case 'ADD_ANECDOTE':
    return [...state, action.data]
  default:
    return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const update = (object) => {
  return async dispatch => {
    const anecdote = await anecdotesService.updateOne(object)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: anecdote,
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAndecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAndecdote,
    })
  }
}

export default reducer