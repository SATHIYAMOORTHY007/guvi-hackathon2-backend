const express = require('express')
const router = express.Router()
const { verifyAdmin, verifyToken } = require('../utils/verifyToken')
const {
  createReservation,
  getAllReservation,
  getreservation,
  getreservedUser,
} = require('../controllers/reservation')

router.post('/createReservation', verifyToken, createReservation)
router.post('/getreservation/:id', getreservation)
router.post('/getreservedUser/:movie_id/:theater_id', getreservedUser)
router.post('/getAllReservation', getAllReservation)

module.exports = router
