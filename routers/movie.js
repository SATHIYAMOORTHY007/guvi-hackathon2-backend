const express = require('express')
const router = express.Router()
const { verifyAdmin, verifyToken } = require('../utils/verifyToken')
const {
  create,
  getallmovie,
  updateMovie,
  getParticularMovie,
  deleteMovie,
} = require('../controllers/movie')
router.post('/create', verifyAdmin, create)
router.get('/getAllMovie', verifyToken, getallmovie)
router.put('/updateMovie/:id', verifyAdmin, updateMovie)
router.post('/getParticularMovie/:id', getParticularMovie)
router.delete('/deleteMovie/:id', verifyAdmin, deleteMovie)
module.exports = router
