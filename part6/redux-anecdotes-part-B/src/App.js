import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
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

export default App