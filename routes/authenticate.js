const axios        = require('axios')

module.exports = (req, res, next) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + req.params.token).then(function (response) {
      res.locals.user = response.data
      next()
    })
    .catch(function (error) {
      res.send('You do not have access to this route')
    })
}
