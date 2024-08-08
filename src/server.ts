import app from './app.js'

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'test') console.log(`Server: *****Test Mode***** is listening on port ${PORT}.`)
  else {
    console.log(`Server: is listening on port ${PORT}.`)
  }
})
