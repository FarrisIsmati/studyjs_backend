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

//Callback for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  Users.findById(req.session.passport.user)
  .then((user) => {
    res.redirect(`http://localhost:3000/` + user.googleId)
  })
  .catch((err) => {
    console.log(err)
  })
  console.log(req.session.passport.user)
})

module.exports = router

//let token = jwt.sign(payload, keys.jwtSecret, {
// expiresIn: 4000
//})
// res.json({
//   "success": "Worked",
//   "token": token
// })
//https://blog.jscrambler.com/implementing-jwt-using-passport/
//https://www.youtube.com/watch?v=FV-x9mmnwyY&t=386s
