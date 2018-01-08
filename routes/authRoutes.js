const router    = require('express').Router()
const passport  = require('passport')
const jwt       = require('jsonwebtoken')

const mongoose  = require('../db/schema')
const Users     = mongoose.model('User')
const keys      = require('../config/keys')

router.get('/logout', (req,res) => {
  //Handle with passport
  res.send('Logging out user')
})

router.get('/', (req,res) => {
  res.send('Logged in')
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.json({
    'success': 'yes'
  })
})

module.exports = router
