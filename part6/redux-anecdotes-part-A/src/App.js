import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  const store = props.store

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store}/>
      <h2>create new</h2>
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App