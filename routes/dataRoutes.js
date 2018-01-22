const dataRouter    = require('express').Router()
const update        = require('immutability-helper')

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
      res.json({user})
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
      let newTopic = new Topic(req.body)
      user.domain.topics.push(newTopic)
      console.log(user)
      user.save()
        .then((data) => {
          res.status(200).json(data)
        })
    })
})

// Delete Specific Topic
// Requries the TopicID & Token
dataRouter.delete('/user/topic/:id/:token', authenticate, (req, res) => {
  Users.update(
    {googleId: res.locals.user.sub},
    { $pull: { 'domain.topics' : { _id : req.params.id } } }
  ).then((user) => {
    res.status(200).json(user)
  })
})

// Edit Topics Arrangement
// Requries the topic ID & Token to edit the subtopic of a user
dataRouter.put('/user/topics/:token', authenticate, (req, res) => {
  Users.update(
    { googleId: res.locals.user.sub },
    { $set: { 'domain.topics' : req.body } }
  ).then(user => {
    console.log(user)
    res.json(user)
  })
})

// Edit specific Topics
// Requries the topic ID & Token to edit the subtopic of a user
dataRouter.put('/user/topic/:id/:token', authenticate, (req, res) => {
  console.log(req.body)
  Users.update(
    { googleId: res.locals.user.sub, 'domain.topics._id': req.params.id },
    { $set: { 'domain.topics.$' : req.body } }
  ).then(user => {
    res.json(user)
  })
})

// Create a Subtopic
// Requries the topic ID & Token to edit the subtopic of a user
dataRouter.post('/user/topic/:id/:token', authenticate, (req, res) => {
  Users.update(
    { googleId: res.locals.user.sub, 'domain.topics._id': req.params.id },
    { $push: { 'domain.topics.$.subtopics' : req.body } }
  ).then(user => {
    res.json(user)
  })
})

// Edit a Subtopic
// Requries the topic ID & Token to edit the subtopic of a user
dataRouter.put('/user/topic/:id/:subtopic/:token', authenticate, (req, res) => {
  Users.findOne({googleId: res.locals.user.sub})
  .then((result)=>{
    const topic = result.domain.topics.find((topic)=>{return topic._id == req.params.id})
    const subtopicIndex = topic.subtopics.findIndex((subtopic)=>{return subtopic._id == req.params.subtopic})
    const subtopic = topic.subtopics.find((subtopic)=>{return subtopic._id == req.params.subtopic})
    const updatedSubtopic = update(subtopic,
      { [req.body.value]: { $set: req.body.text}}
    )

    const updatedTopic = update(topic,{subtopics: {subtopicIndex: {$set: updatedSubtopic}}})

    Users.update(
      { googleId: res.locals.user.sub, 'domain.topics._id': req.params.id },
      { $set: { 'domain.topics.$' : updatedTopic } }
    ).then(user => {
      res.json(topic)
    })
  })
})

// Delete Specific Subtopic
// Requries the TopicID & SubtopicID & Token
dataRouter.delete('/user/topic/:id/:subtopicId/:token', authenticate, (req, res) => {
  Users.update(
    { googleId: res.locals.user.sub, 'domain.topics._id': req.params.id },
    { $pull: { 'domain.topics.$.subtopics' : { _id : req.params.subtopicId } } }
  ).then((user) => {
    res.status(200).json(user)
  })
})

module.exports = dataRouter
