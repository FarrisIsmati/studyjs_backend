const mongoose    = require('./schema.js')

const User        = mongoose.model('UserSchema')

// User.remove({})
//   .then(() => {
//     User.collection.insert(//)
//       .then((user) => {
//         console.log(phrase)
//         process.exit()
//       })
//   })
//   .catch((err) => {
//     console.log(err)
//   })
