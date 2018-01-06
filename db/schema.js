const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  'googleId': {},
  'domain': {
    'public': Boolean,
    'topic': [TopicSchema]
  }
})

const TopicSchema = new mongoose.Schema ({
  'name' : {
    type: String,
    required: true
  },
  'subtopic': [SubtopicSchema],
  'date': {
    type: Date,
    default: Date.now
  }
})

const SubtopicSchema = new mongoose.Schema ({
  'name' : {
    type: String,
    required: true
  },
  'data': {
    type: String,
    required: true
  },
  'children': [SubtopicSchema]
})

mongoose.model('UserSchema', PhraseSchema)

module.exports = mongoose
