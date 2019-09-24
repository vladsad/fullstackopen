import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const store = props.store;

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(addAnecdote(content))
    event.target.anecdote.value = ''
    store.dispatch(setNotification(`You created ${content} anecdote`))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  return (
    <form onSubmit={add}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm