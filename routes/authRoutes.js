const router    = require('express').Router()

const mongoose  = require('../db/schema')
const User     = mongoose.model('User')

router.post('/google', (req, res) => {
  User.findOne({googleId: req.body.googleId})
  .then(currentUser =>  {
    if(currentUser){
        res.json({
          data: 'User already exists'
        })
    } else {
        new User({
            googleId: req.body.googleId,
            username: req.body.username,
        }).save().then((newUser) => {
            res.json({
              data: 'User created'
            })
        })
    }
  })
})

module.exports = router
