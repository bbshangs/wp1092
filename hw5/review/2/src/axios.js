import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  let flag = false
  const response = await instance.post('/start') 
    .catch(function (error){
      console.log("the server is not responding, please wait for a sec")
      flag = true
    })
  return (flag ? 'waitting' : response.data.msg)
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  let flag = false
  let msg
  const response = await instance.get('/guess', { params: { number } })
    .catch(function (error) {
      flag = true
      if(error.response) {
        msg = 'illegal number'
      }
      else if(error.request) {
        msg = 'waitting'
      }
    })

  return (flag ? msg : response.data.msg)
}

const restart = async () => {
  let flag = false
  const response = await instance.post('/restart')
    .catch(function (error) {
      console.log("the server is not responding, please wait for a sec")
      flag = true
    })
  return (flag ? 'waitting' : response.data.msg)
}

export { startGame, guess, restart }
