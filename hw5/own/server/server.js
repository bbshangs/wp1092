import express from 'express'
import cors from 'cors'
import path from 'path'

import guessRoute from './routes/guess'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

const filename = './server/log/' + getTime() + '.log'
// console.log("filename = ", filename)

function getTime() {
  var curTime = new Date()
  var curYear = curTime.getFullYear()
  var curMonth = curTime.getMonth() + 1
  var curDate = curTime.getDate()
  var curHour = curTime.getHours()
  var curMin = curTime.getMinutes()
  var curSec = curTime.getSeconds()
  return `${curYear}-${curMonth}-${curDate}-${curHour}-${curMin}-${curSec}`
}

export { getTime, filename }