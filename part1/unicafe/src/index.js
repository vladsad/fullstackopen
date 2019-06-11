import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text,value}) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good * 1 + bad * (-1)) / all;
  const positive = (good / all * 100) + '%';
  
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  
  return (
    <>
      <table>
        <tbody>
        <tr>
          <Statistic text="good" value ={good} />
        </tr>
        <tr>
          <Statistic text="neutral" value ={neutral} />
        </tr>
        <tr>
          <Statistic text="bad" value ={bad} />
        </tr>
        <tr>
          <Statistic text="all" value ={all} />
        </tr>
        <tr>
          <Statistic text="average" value ={average} />
        </tr>
        <tr>
          <Statistic text="positive" value ={positive} />
        </tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>get feedback</h2>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)