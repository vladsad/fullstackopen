import React from 'react'

const Anecdote = ({anecdote}) => {
  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes}</p>
      <p>for more info see {anecdote.info}</p>
    </>
  )
}

export default Anecdote