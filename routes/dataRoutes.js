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
dataRouter.get('/user/:token', (req, res) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + req.params.token).then(function (response) {
      Users.findOne({"googleId" : response.data.sub})
        .then((user) => {
          res.json(user)
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch(function (error) {
      console.log('it doesnt work')
      res.json(error)
    })
})

//Update user data
dataRouter.put('/user/:token', (req, res) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + req.params.token)
  .then(function (response) {
    Users.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  .catch(function (error) {
    console.log('it doesnt work')
    res.json(error)
  })
})

module.exports = dataRouter
