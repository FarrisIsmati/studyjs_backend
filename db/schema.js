const mongoose = require('./connection.js')

const subtopicSchema = new mongoose.Schema ({
  'name' : {
    type: String,
    required: true
  },
  'show': {
    type: Boolean,
    default: false
  },
  'data': Object,
  // 'subtopics': [this]
})

const topicSchema = new mongoose.Schema ({
  'name' : {
    type: String,
    required: true
  },
  'show': {
    type: Boolean,
    default: true
  },
  'subtopics': [subtopicSchema],
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
    'topics': [topicSchema]
  }
})

mongoose.model('User', userSchema)
mongoose.model('Topic', topicSchema)
mongoose.model('Subtopic', subtopicSchema)

module.exports = mongoose
