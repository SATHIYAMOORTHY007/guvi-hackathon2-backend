const express = require('express')
const router = express.Router()
const {
  createTheater,
  getAllTheater,
  getTheaterbyid,
  updateTheater,
  deleteTheater,
  getParticularTheater,
  getseats,
  updateSeats,
} = require('../controllers/theater')

router.post('/createTheater', createTheater)
router.post('/getTheaterbyid/:movie_id', getTheaterbyid)
router.post('/getParticularTheater/:id', getParticularTheater)
router.get('/getAllTheater', getAllTheater)
router.delete('/deleteTheater/:id', deleteTheater)
router.put('/updateTheater/:id', updateTheater)
router.put('/updateSeats/:id', updateSeats)
router.post('/getseats/:id', getseats)

module.exports = router
