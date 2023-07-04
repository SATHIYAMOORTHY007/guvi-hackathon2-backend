const express = require('express')
const Theater = require('../models/theater')
const Movie = require('../models/movie')

const createTheater = async (req, res) => {
  let row = [
    [
      { id: 1, number: 'A1' },
      { id: 2, number: 'A2' },
      { id: 3, number: 'A3' },
      { id: 4, number: 'A4' },
      { id: 5, number: 'A5' },
      { id: 6, number: 'A5' },
      { id: 7, number: 'A6' },
      { id: 8, number: 'A7' },

      { id: 9, number: 'A8' },
      { id: 10, number: 'A9' },
    ],
    [
      { id: 11, number: 'A10' },
      { id: 12, number: 'A11' },
      { id: 13, number: 'A12' },
      { id: 14, number: 'B1' },
      { id: 15, number: 'B2' },
      { id: 16, number: 'B3' },
      { id: 17, number: 'B4' },
      { id: 18, number: 'B5' },
      { id: 19, number: 'B6' },
      { id: 20, number: 'B7' },
    ],
    [
      { id: 21, number: 'B8' },
      { id: 22, number: 'B9' },
      { id: 23, number: 'B10' },
      { id: 24, number: 'B11' },
      { id: 25, number: 'B12' },
      { id: 26, number: 'B13' },
      { id: 27, number: 'C1' },
      { id: 28, number: 'C2' },
      { id: 29, number: 'C3' },
      { id: 30, number: 'C4' },
    ],
    [
      { id: 31, number: 'C5' },
      { id: 32, number: 'C6' },
      { id: 33, number: 'C7' },
      { id: 34, number: 'C8' },

      { id: 35, number: 'C9' },
      { id: 36, number: 'C10' },
      { id: 37, number: 'C11' },
      { id: 38, number: 'C12' },
      { id: 39, number: 'C13' },
      { id: 40, number: 'C14' },
    ],
    [
      { id: 41, number: 'D1' },
      { id: 42, number: 'D2' },
      { id: 43, number: 'D3' },
      { id: 44, number: 'D4' },
      { id: 45, number: 'D5' },
      { id: 46, number: 'D6' },
      { id: 47, number: 'D7' },
      { id: 48, number: 'D8' },

      { id: 49, number: 'D9' },
      { id: 50, number: 'D10' },
    ],
    [
      { id: 51, number: 'D11' },
      { id: 52, number: 'D12' },
      { id: 53, number: 'D13' },
      { id: 54, number: 'E1' },
      { id: 55, number: 'E2' },
      { id: 56, number: 'E3' },
      { id: 57, number: 'E4' },
      { id: 58, number: 'E5' },
      { id: 59, number: 'E6' },
      { id: 60, number: 'E7' },
    ],
    [
      { id: 61, number: 'E8' },

      { id: 62, number: 'E9' },
      { id: 63, number: 'E10' },
      { id: 64, number: 'E11' },
      { id: 65, number: 'E12' },
      { id: 66, number: 'E13' },
      { id: 67, number: 'F1' },
      { id: 68, number: 'F2' },
      { id: 69, number: 'F3' },
      { id: 70, number: 'F4' },
    ],
    [
      { id: 71, number: 'F5' },
      { id: 72, number: 'F6' },
      { id: 73, number: 'F7' },
      { id: 74, number: 'F8' },

      { id: 75, number: 'F9' },
      { id: 76, number: 'F10' },
      { id: 77, number: 'F11' },
      { id: 78, number: 'F12' },
      { id: 79, number: 'F13' },
      { id: 80, number: 'G1' },
    ],
    [
      { id: 81, number: 'G2' },
      { id: 82, number: 'G3' },
      { id: 83, number: 'G4' },
      { id: 84, number: 'G5' },
      { id: 85, number: 'G6' },
      { id: 86, number: 'G7' },
      { id: 87, number: 'G8' },

      { id: 88, number: 'G9' },
      { id: 89, number: 'G10' },
      { id: 90, number: 'G11' },
    ],
    [
      { id: 91, number: 'G12' },
      { id: 92, number: 'G13' },
      { id: 93, number: 'H1' },
      { id: 94, number: 'H2' },
      { id: 95, number: 'H3' },
      { id: 96, number: 'H4' },
      { id: 97, number: 'H5' },
      { id: 98, number: 'H6' },
      { id: 99, number: 'H7' },
      { id: 100, number: 'H8' },
    ],
  ]
  req.body.seats = row
  try {
    const theater = await Theater.create(req.body)
    theater.save()
    res.status(201).send(theater)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const getAllTheater = async (req, res) => {
  try {
    const theater = await Theater.find({})
    res.status(201).json({ message: theater })
  } catch (e) {
    return res.status(400).json({ message: err.message })
  }
}
const getseats = async (req, res) => {
  const id = req.params.id

  try {
    const theater = await Theater.find({ _id: id })

    res.status(201).json([theater[0].seats, theater[0].ticketPrice])
  } catch (e) {
    return res.status(400).json({ message: err.message })
  }
}

//get the theater by using movie id
const getTheaterbyid = async (req, res) => {
  const id = req.params.movie_id

  try {
    const theater = await Theater.find({ movieid: id })
    const movie = await Movie.findById({ _id: id })
    if (!theater) return res.sendStatus(404)
    return res.json({ message: theater, movie })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const getParticularTheater = async (req, res) => {
  const id = req.params.id

  try {
    const theater = await Theater.findById({ _id: id })

    if (!theater) return res.sendStatus(404)
    return res.json({ message: theater })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const updateTheater = async (req, res) => {
  const id = req.params.id
  const { name, ticketPrice, movieid, image, startsAt, city } = req.body
  try {
    const theater = await Theater.findByIdAndUpdate(id, {
      name,
      ticketPrice,
      movieid,
      image,
      startsAt,
      city,
    })

    await theater.save()
    if (!theater) return res.sendStatus(404)
    return res.send(theater)
  } catch (e) {
    return res.status(400).send(e)
  }
}

const deleteTheater = async (req, res) => {
  const id = req.params.id

  try {
    const theater = await Theater.findByIdAndDelete({ _id: id })
    if (!theater) return res.sendStatus(404)
    return res.send('deleted successfully')
  } catch (e) {
    return res.sendStatus(400)
  }
}

const updateSeats = async (req, res) => {
  const id = req.params.id

  try {
    const theater = await Theater.findByIdAndUpdate(id, {
      seats: req.body,
    })
    console.log('theater', theater)
    await theater.save()

    if (!theater) return res.sendStatus(404)
    return res.send(theater)
  } catch (e) {
    return res.status(400).send(e)
  }
}

module.exports = {
  createTheater,
  getAllTheater,
  getTheaterbyid,
  updateTheater,
  deleteTheater,
  getParticularTheater,
  getseats,
  updateSeats,
}
