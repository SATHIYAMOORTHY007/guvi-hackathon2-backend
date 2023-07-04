const mongoose = require('mongoose')
const { Schema } = mongoose
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: [],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  },
  Qrcode: {
    type: String,
  },
})

module.exports = mongoose.model('Reservation', reservationSchema)
