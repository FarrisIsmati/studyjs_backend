const express     = require('express')
const parser      = require('body-parser')
//const mongoose    = require('./db/schema.js')
const cors        = require('cors')

const app = express()

app.set('port', process.env.PORT || 3001)
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())

app.listen(app.get('port'), () => {
  console.log('You are a god on ' + app.get('port'))
})
