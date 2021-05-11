import express from 'express'
import getNumber from '../core/getNumber'
import getTime from '../core/getTime'

const router = express.Router()
const fs = require('fs');
let options = {
  flags: 'a', 
  encoding: 'utf8',
}
let time = getTime()
let file_name = "./server/log/"+time.substring(0, time.length-3)+".log"
// console.log(process.cwd())
let stderr = fs.createWriteStream(file_name, options)
let logger = new console.Console(stderr)

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', async(_, res) => {
  const number = await getNumber(true)
  time = getTime()
  logger.log('start number=%s %s', number, time)
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', async(req, res) => {
  const number = await getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    // console.log('guessed: %s', guessed)
    // console.log('number: %s', number)
    time = getTime()
    logger.log('guess=%s %s', guessed, time)
    if(guessed > number) {
      res.send({ msg: 'Smaller' })
    }
    else if(guessed === number) {
      res.send({ msg: 'Equal' })
      logger.log('end-game')
    }
    else {
      res.send({ msg: 'Bigger' })
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', async(_, res) => {
  const number = await getNumber(true)
  time = getTime()
  logger.log('restart number=%s %s', number, time)  

  res.json({ msg: 'The game has restarted.' })
})

export default router
