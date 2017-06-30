const express = require('express')
const app = express()
const mustache = require('mustache-express')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.listen(3000, function() {
  console.log('YAY! http://0.0.0.0:3000')
})

const main = require('./routes/main')

app.use('/', main)
