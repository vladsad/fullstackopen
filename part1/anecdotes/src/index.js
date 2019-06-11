import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = ({anecdotes}) => {
  const getRandomAnecdot = () => {
    const index = Math.floor(Math.random() * data.length)
    return data[index]
  }
       
  const getMostVotest = () => {
    const getMostVotedAnecdote = data.sort((a,b)=>{
        return b.votes - a.votes
    })[0]

    return getMostVotedAnecdote
  }

  const [data, setData] = useState(
    anecdotes.reduce((acc,value,index)=> {
        return [...acc, {
            anecdot: value,
            votes: 0,
            index
        }]
      },[]) 
  )
  const [selected, setSelected] = useState(data[0])

  const [mostVotest,setMostVotest] = useState(data[0])

  const vote = (index) => {
      const newData = [...data]
      const anecdot = newData[index]
      anecdot.votes += 1
      setSelected({...anecdot})
      setMostVotest({...getMostVotest()})
      setData(newData)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{selected.anecdot}</p>
      <p>has {selected.votes} votes</p>
      <Button text="vote" 
        handleClick={() => vote(selected.index)}/>
      <Button text="next anecdot" 
        handleClick={() => setSelected(getRandomAnecdot())}/>
      <h2>Anecdote with most votes</h2>
      <p>{mostVotest.anecdot}</p>
      <p>has {mostVotest.votes} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)