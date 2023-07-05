const express = require('express')
const router = express.Router()
const {
  deleteShowTime,
  getAllshowTimes,
  createShowtime,
  getshowTimes,
} = require('../controllers/showtime')

router.post('/createShowtime', createShowtime)
router.get('/getAllshowTimes', getAllshowTimes)
router.get('/getshowTimes/:movieid/:cinimaid', getshowTimes)
router.post('/deleteShowTime/:id', deleteShowTime)

module.exports = router
