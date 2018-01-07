const express         = require('express')
const parser          = require('body-parser')
const cors            = require('cors')

const mongoose      = require('./db/schema.js')

const passportSetup   = require('./config/passport-setup')
const authRoutes      = require('./routes/auth-routes')

const app = express()

app.set('port', process.env.PORT || 3001)
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())

app.use('/auth', authRoutes)

app.listen(app.get('port'), () => {
  console.log('You are a god on ' + app.get('port'))
})
