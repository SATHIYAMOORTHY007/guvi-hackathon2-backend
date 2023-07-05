const express = require('express')
const router = express.Router()

const {
  create,
  getallmovie,
  updateMovie,
  getParticularMovie,
  deleteMovie,
} = require('../controllers/movie')
router.post('/create', create)
router.get('/getAllMovie', getallmovie)
router.put('/updateMovie/:id', updateMovie)
router.post('/getParticularMovie/:id', getParticularMovie)
router.delete('/deleteMovie/:id', deleteMovie)
module.exports = router
