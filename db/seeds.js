const mongoose    = require('./schema')

const User        = mongoose.model('User')
const seedData    = require('./seedData')

User.remove({})
  .then(() => {
    User.collection.insert(seedData)
      .then((user) => {
        console.log(user)
        process.exit()
      })
  })
  .catch((err) => {
    console.log(err)
  })
