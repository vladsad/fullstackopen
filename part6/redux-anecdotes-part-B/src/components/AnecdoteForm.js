import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content) {
      return null
    }
    props.addAnecdote(content)
    event.target.anecdote.value = ''
    props.setNotification(`You created '${content}' anecdote`)
    setTimeout(() => {
      props.removeNotification()
    }, 5000)
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
  removeNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm