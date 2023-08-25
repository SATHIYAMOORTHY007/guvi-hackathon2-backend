const express = require('express')
const router = express.Router()
const pay = require('../controllers/pay')

router.post('/payment', pay)
module.exports = router
