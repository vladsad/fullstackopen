import React from 'react'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = props.visibleAnecdotes

  const vote = (id) => {
    props.increaseVote(id)
    const anecdote = anecdotes.find(a => a.id === id)
    props.setNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      props.removeNotification()
    }, 5000)
  }

  return (
    anecdotes
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

const anecdotesToShow = ({anecdotes, filter}) => {
  if(anecdotes.length === 0) {
    return []
  }

  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a,b) => a.votes - b.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  increaseVote,
  setNotification,
  removeNotification: clearNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList