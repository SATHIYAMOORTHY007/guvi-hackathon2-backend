const express = require('express')
const Reservation = require('../models/reservation')
const generateQR = require('../utils/generateQRCode')
const sendEmail = require('../utils/email')
const Movie = require('../models/movie')
const Theater = require('../models/theater')
const createReservation = async (req, res) => {
  console.log('reservation', req.body)
  try {
    const reservation = await Reservation.create(req.body)
    await reservation.save()
    /*    const QRCode = await generateQR(
      `http://localhost:3001/checkin/${reservation._id}`,
    ) */

    /*  const htmlContent = `
    <h1><strong>Invitation For Movie</strong></h1>
    <p>Hi, You have been invited by pixel cinima</p>
    <p>Movie name: ${reservation.movieId}</p>
    <p>Date: ${reservation.date}</p>
    <p>Time: ${reservation.startAt}</p>
    <p>Cinema seat: ${reservation.seats}</p>
    <p>Cinema Amount: ${reservation.total}</p>
    <img src="${QRCode}" alt="cinema Image"/>
    <br/>
  `

    const { email } = req.body

    sendEmail({
      email: email,
      subject: 'ticket',
      text: 'booked your show successfully',
    }) */
    return res.status(201).send({ reservation })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
}

const getreservation = async (req, res) => {
  const id = req.params.id

  try {
    const reservation = await Reservation.findById({
      _id: id,
    })
    res.status(200).send(reservation)
  } catch (e) {
    res.status(400).send(e)
  }
}

const getreservedUser = async (req, res) => {
  const movie_id = req.params.movie_id
  const theater_id = req.params.theater_id
  console.log(req.params)
  try {
    const reservation = await Reservation.find({
      movieId: movie_id,
      theaterId: theater_id,
    })
    res.status(200).send(reservation)
  } catch (e) {
    res.status(400).send(e)
  }
}

const getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find({})
    res.send(reservations)
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports = {
  createReservation,
  getAllReservation,
  getreservation,
  getreservedUser,
}
