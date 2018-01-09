const dataRouter    = require('express').Router()

const authenticate  = require('./authenticate.js')
const mongoose      = require('../db/schema.js')

const Users         = mongoose.model('User')
const Topic         = mongoose.model('Topic')
const Subtopic      = mongoose.model('Subtopic')

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

//Create Topic
//Requires Token
dataRouter.post('/user/topic/:token', authenticate, (req, res) => {
  Users.findOne({"googleId": res.locals.user.sub})
    .then((user) => {
      res.json(user)
      let newTopic = new Topic(req.body)
      user.domain.topic.push(newTopic)
      console.log(user)
      user.save()
      .then((user) => {
        res.status(200).json(user)
      })
    })
})

// Delete topic
// Requries the TopicID & Token
dataRouter.delete('/user/topic/:id/:token', authenticate, (req, res) => {
  Users.update(
    {googleId: res.locals.user.sub},
    { $pull: { 'domain.topic' : { _id : req.params.id } } }
  ).then((user) => {
    res.status(200).json(user)
  })
})

// Edit Full topic/subtopics
// Requries the topic ID & Token to edit the subtopic of a user
dataRouter.put('/user/topic/:id/:token', authenticate, (req, res) => {
  Users.update(
    { googleId: res.locals.user.sub, 'domain.topic._id': req.params.id },
    { $set: { 'domain.topic.$' : req.body } }
  ).then(user => {
    res.json(user)
  })
})

// Delete SubTopics/Children
// Requries the TopicID & Token
dataRouter.delete('/user/topic/:id/:token', authenticate, (req, res) => {
  Users.update(
    {googleId: res.locals.user.sub},
    { $pull: { 'domain.topic' : { _id : req.params.id } } }
  ).then((user) => {
    res.status(200).json(user)
  })
})

module.exports = dataRouter
