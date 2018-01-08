const axios        = require('axios')

module.exports = function isAuthenticated(req, res, next) {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + req.params.token).then(function (response) {
      console.log('it works')
      return next()
    })
    .catch(function (error) {
      console.log('it doesnt work')
      res.redirect('http://localhost:3000')
    })
}
