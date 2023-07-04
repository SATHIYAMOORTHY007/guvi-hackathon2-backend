const express = require('express')
const Movie = require('../models/movie')

const create = async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    movie.save()
    res.status(201).json({ message: movie })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const getallmovie = async (req, res) => {
  try {
    const movie = await Movie.find()
    res.status(201).json({ message: movie })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
const updateMovie = async (req, res) => {
  const id = req.params.id
  const {
    name,
    language,
    genre,
    image,
    director,
    description,
    duration,
  } = req.body
  try {
    const movie = await Movie.findByIdAndUpdate(id, {
      name,
      language,
      genre,
      image,
      director,
      description,
      duration,
    })

    if (!movie) return res.sendStatus(404)
    return res.json({ message: movie })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const getParticularMovie = async (req, res) => {
  const id = req.params.id

  try {
    const movie = await Movie.findById({ _id: id })

    if (!movie) return res.sendStatus(404)
    return res.json({ message: movie })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const deleteMovie = async (req, res) => {
  const _id = req.params.id
  try {
    let movie = await Movie.findByIdAndDelete(_id)
    return !movie ? res.sendStatus(404) : res.send(movie)
  } catch (error) {
    return res.json({ message: err.message })
  }
}

module.exports = {
  create,
  getallmovie,
  updateMovie,
  getParticularMovie,
  deleteMovie,
}
