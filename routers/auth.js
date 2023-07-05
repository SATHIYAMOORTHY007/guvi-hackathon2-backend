const express = require('express')
const router = express.Router()
const { verifyAdmin, verifyToken } = require('../utils/verifyToken')
const {
  register,
  login,
  forgetpaasword,
  resetpassword,
  getallUser,
  updateQuery,
  getAllQuery,
} = require('../controllers/auth')

router.post('/getallUser', getallUser)
router.post('/register', register)
router.post('/forgetpassword', forgetpaasword)
router.post('/resetpassword/:id/:token', resetpassword)
router.post('/updateQuery/:id', updateQuery)
router.post('/getAllQuery', getAllQuery)
router.post('/login', login)

module.exports = router
