// auth.js
const passport              = require("passport")
const passportJWT           = require("passport-jwt")

const mongoose              = require('../db/schema.js')
const Users                 = mongoose.model('User')
const cfg                   = require("./keys")

const ExtractJwt            = passportJWT.ExtractJwt;
const Strategy              = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
}

module.exports = function() {
    let strategy = new Strategy(params, function(payload, done) {
        Users.find()
          .then((users)=> {
            let user = users[payload.id] || null
            user ? done(null, {id: user.id}) : done(new Error("User not found"), null)
          })
          .catch((err) => {
            return err
          })
    })
    passport.use(strategy)
    return {
        initialize: function() {
            return passport.initialize()
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession)
        }
    }
}
