import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  const store = props.store

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification store={store}/>
      <h2>Create new</h2>
      <AnecdoteForm store={store}/>
      <br/>
      <h2>List of anecdotes</h2>
      <Filter store={store}/>
      <AnecdoteList store={store}/>
    </div>
  )
}

export default App