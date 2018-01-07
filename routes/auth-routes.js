const router    = require('express').Router()
const passport  = require('passport')

router.get('/logout', (req,res) => {
  //Handle with passport
  res.send('Logging out user')
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

//Callback for google to redirect to
router.get('/google/redirect', (req,res) => {
  res.send('You reached the callbackURI')
})

module.exports = router
