const passport          = require('passport')
const GoogleStrategy    = require('passport-google-oauth20')

const keys              = require('./keys')
const User              = require('../db/schema')

const createNewUser = profile => {
  new User({
    username: profile.displayName,
    googleId: profile.id
  })
  .save()
  .then(newUser => {
    console.log('New user created : ' + newUser)
  })
}

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID:   keys.google.clientId,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
    .then(currentUser =>  {
      currentUser ? console.log('user is : ' + currentUser) : createNewUser(profile)
    })
  })
)
