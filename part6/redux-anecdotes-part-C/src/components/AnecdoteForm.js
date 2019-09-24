import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content) {
      return null
    }
    event.target.anecdote.value = ''
    const anecdote = await anecdotesService.createNew(content)
    props.addAnecdote(anecdote)
    props.setNotification(`You created '${anecdote.content}' anecdote`)
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
  removeNotification: clearNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm