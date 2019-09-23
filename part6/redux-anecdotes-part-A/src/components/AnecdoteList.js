import React from 'react'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {

  const store = props.store
  const anecdotes = store.getState()

  const vote = (id) => {
    store.dispatch(increaseVote(id))
  }

  return (
      anecdotes
        .sort((a,b) => a.votes - b.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
  )
}

export default AnecdoteList