import React from 'react'
import { update } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = props.visibleAnecdotes

  const vote = async id => {
    const anecdote = anecdotes.find(a => a.id === id)
    props.update({ ...anecdote, votes: anecdote.votes + 1 })
    props.setNotification(`You voted '${anecdote.content}'`, 5)
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

const anecdotesToShow = ({ anecdotes, filter }) => {
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
  update,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)

export default ConnectedAnecdoteList