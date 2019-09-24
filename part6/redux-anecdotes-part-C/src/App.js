import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdotesService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    anecdotesService
      .getAll().then(anecdotes => props.initAnecdotes(anecdotes))
  })

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification/>
      <h2>Create new</h2>
      <AnecdoteForm/>
      <br/>
      <h2>List of anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)