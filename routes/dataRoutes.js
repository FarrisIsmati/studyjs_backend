const dataRouter    = require('express').Router()

const mongoose      = require('../db/schema.js')
const Users         = mongoose.model('User')

//Get all users
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
dataRouter.get('/user/:id', (req, res) => {
  Users.findOne({"googleId" : req.params.id})
  .then((user) => {
    res.json(user)
  })
  .catch((err) => {
    console.log(err)
  })
})

//Update user data
dataRouter.put('/users/:id', (req, res) => {
  Users.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = dataRouter
