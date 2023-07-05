const express = require('express')
const router = express.Router()

const {
  createReservation,
  getAllReservation,
  getreservation,
  getreservedUser,
} = require('../controllers/reservation')

router.post('/createReservation', createReservation)
router.post('/getreservation/:id', getreservation)
router.post('/getreservedUser/:movie_id/:theater_id', getreservedUser)
router.post('/getAllReservation', getAllReservation)

module.exports = router
