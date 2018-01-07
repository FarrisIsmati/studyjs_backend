const mongoose = require('./connection.js')

const subtopicSchema = new mongoose.Schema ({
  'name' : {
    type: String,
    required: true
  },
  'data': {
    type: String,
    required: true
  },
  'children': [this]
})

const topicSchema = new mongoose.Schema ({
  'name' : {
    type: String,
    required: true
  },
  'subtopic': [subtopicSchema],
  'date': {
    type: Date,
    default: Date.now
  }
})

const userSchema = new mongoose.Schema({
  'username': String,
  'googleId': String,
  'domain': {
    'public': Boolean,
    'topic': [topicSchema]
  }
})

mongoose.model('User', userSchema)

module.exports = mongoose
