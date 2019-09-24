import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content) {
      return null
    }
    event.target.anecdote.value = ''
    props.addAnecdote(content)
    props.setNotification(`You created '${content}' anecdote`, 5)
  }

  return (
    <form onSubmit={add}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm)

export default ConnectedAnecdoteForm