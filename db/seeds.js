const mongoose    = require('./schema')

const User        = mongoose.model('User')

User.remove({})
  .then(() => {
    process.exit()
  })
  .catch((err) => {
    console.log(err)
  })
