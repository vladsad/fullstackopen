const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'INCREASE_VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const increaseVote = (id) => {
  return {
    type: 'INCREASE_VOTE',
    data: { id }
  }
}

export const addAnecdote = (data) => {
  return {
    type: 'ADD_ANECDOTE',
    data
  }
}

export default reducer