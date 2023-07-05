const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.token
  console.log(token)
  if (!token) {
    return res.sendStatus(404)
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.sendStatus(401)
    }
    next()
  })
}

const verifyAdmin = (req, res, next) => {
  const token = req.headers.token
  if (!token) {
    return res.sendStatus(404)
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (!user.isAdmin) return res.sendStatus(401)
    next()
  })
}

module.exports = { verifyAdmin, verifyToken }
