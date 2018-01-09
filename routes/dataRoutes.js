const dataRouter    = require('express').Router()
const axios         = require('axios')

const authenticate  = require('./authenticate.js')
const mongoose      = require('../db/schema.js')

const Users         = mongoose.model('User')

//Get all users (Just for testing)
dataRouter.get('/users', (req,res) => {
  Users.find()
  .then((users)=> {
    res.json(users)
  })
  .catch((err) => {
    console.log(err)
  })
})

//Find one user
dataRouter.get('/user/:token', authenticate, (req, res) => {
  Users.findOne({"googleId" : res.locals.user.sub})
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

//Update user data
dataRouter.put('/user/:token', authenticate, (req, res) => {
  Users.findOneAndUpdate({"googleId": res.locals.user.sub}, req.body, {new: true})
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = dataRouter
