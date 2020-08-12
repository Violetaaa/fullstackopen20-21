import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ text, value }) => (
  <p>{text}{value}</p>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const averageCalculator = () => {
    if (good + bad + neutral <= 0) {
      return 0
    } else {
      return (good - bad) / (good + bad + neutral)
    }
  }

  const positiveCalculator = () => {
    if (good + bad + neutral <= 0) {
      return 0
    } else {
      return ((good * 100) / (good + bad + neutral)) + '%'
    }
  }

  const goodVote = () => setGood(good + 1)
  const neutralVote = () => setNeutral(neutral + 1)
  const badVote = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={goodVote} text='good' />
        <Button handleClick={neutralVote} text='neutral' />
        <Button handleClick={badVote} text='bad' />
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics text='good: ' value={good} />
        <Statistics text='neutral: ' value={neutral} />
        <Statistics text='bad: ' value={bad} />
        <Statistics text='all: ' value={good + neutral + bad} />
        <Statistics text='average: ' value={averageCalculator()} />
        <Statistics text='positive: ' value={positiveCalculator()} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)