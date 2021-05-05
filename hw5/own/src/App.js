import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  // const [serverDown, setServerDown] = useState(false)

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          const msg = await startGame()
          if (msg === "Network Error")
            setStatus(msg)
          setHasStarted(true)
          
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          const msg = await restart()
          if (msg === "Network Error")
            setStatus(msg)
          else
            setStatus('')
          setHasWon(false)
          setNumber('')
        }}
      >
        restart
      </button>
    </>
  )

  // TODO: done
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    const msg = await guess(number)
    setStatus(msg)
    if (msg === "Equal")
      setHasWon(true)
  }
  

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
