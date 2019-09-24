import React from 'react'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const store = props.store
  const anecdotes = store.getState().anecdotes

  const vote = (id) => {
    store.dispatch(increaseVote(id))
    const anecdote = anecdotes.find(a => a.id === id)
    store.dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  return (
      anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(store.getState().filter.toLowerCase()))
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