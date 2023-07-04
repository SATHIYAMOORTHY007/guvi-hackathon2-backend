const express = require('express')
const Showtime = require('../models/showtiming')

const createShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.create(req.body)
    showtime.save()
    res.status(201).send(showtime)
  } catch (e) {
    res.status(400).send(e)
  }
}

const getAllshowTimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find({})
    res.send(showtimes)
  } catch (e) {
    res.status(400).send(e)
  }
}

const getshowTimes = async (req, res) => {
  const movieid = req.params.movieid
  const cinimaid = req.params.cinimaid
  try {
    const showtimes = await Showtime.find({
      movieId: movieid,
      cinemaId: cinimaid,
    })
    res.send(showtimes)
  } catch (e) {
    res.status(400).send(e)
  }
}

const deleteShowTime = async (req, res) => {
  const _id = req.params.id
  try {
    const showtime = await Showtime.findByIdAndDelete(_id)
    return !showtime ? res.sendStatus(404) : res.send(showtime)
  } catch (e) {
    return res.sendStatus(400)
  }
}
module.exports = {
  deleteShowTime,
  getAllshowTimes,
  createShowtime,
  getshowTimes,
}
