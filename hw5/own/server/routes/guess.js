import express from 'express'
import getNumber from '../core/getNumber'
import { getTime, filename } from '../server'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

function writeLog(str) {
  var fs = require('fs');
  fs.appendFile(filename, str, (err) => { 
    if (err) throw err
    console.log('Write to file successfully!')
  })
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number = getNumber(true)
  console.log("answer = ", number)
  const curTime = getTime()
  writeLog(`start number=${number} ${curTime}\n`)
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  const curTime = getTime()
  writeLog(`guess ${guessed} ${curTime}\n`)
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed === number) {
      writeLog("end-game\n")
      res.status(200).send({ msg: 'Equal' })
    }
    else if (guessed < number)
      res.status(200).send({ msg: 'Bigger' })
    else 
      res.status(200).send({ msg: 'Smaller' })  
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  const number = getNumber(true)
  console.log("answer = ", number)
  const curTime = getTime()
  writeLog(`restart number=${number} ${curTime}\n`)
  res.json({ msg: 'Restart the game.' })
})

export default router
