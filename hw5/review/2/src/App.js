import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          const msg = await startGame()
          if(msg !== 'waitting') {
            setHasStarted(true)
          }
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
          if(msg !== "waitting") {
            setHasWon(false)
            setStatus('')
            setNumber('')
          }
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    let msg = await(guess(number))
    if(msg === 'Smaller' | msg === 'Bigger') {
      setStatus(msg)
    }
    else if (msg === 'Equal') {
      // setStatus(msg)
      setHasWon(true)
    }
    else if (msg === "illegal number") {
      setStatus(`Error: "${number}" is not a valid number (1 - 100)`)
    }
    else if (msg === "waitting") {
      setStatus("the server is not responding, please wait for a sec")
    }
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
