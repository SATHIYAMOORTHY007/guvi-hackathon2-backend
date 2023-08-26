const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const send = require('send')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer')
const sendEmail = require('../utils/email')

const register = async (req, res) => {
  try {
    const { username, email_id, pwd } = req.body
    console.log(req.body)
    if (!email_id || !pwd)
      return res.status(400).json({ message: 'email or password required' })
    //duplicated email
    const duplicate = await User.findOne({ email: email_id }).exec()
    if (duplicate) return res.json({ message: 'already existing..' })

    const hashpwd = await bcrypt.hash(pwd, 10)
    const result = await User.create({
      username: username,
      email: email_id,
      password: hashpwd,
    })
    const token = jwt.sign(
      { id: User._id, isAdmin: User.isAdmin },
      process.env.jwt,
    )

    res.status(201).json({ message: `user created ` })
  } catch (err) {
    console.log(err)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email_id }).exec()

    if (!user) return res.status(404).json({ message: 'user not found' })

    const isPassword = await bcrypt.compare(req.body.pwd, user.password)

    if (!isPassword)
      return res.status(404).json({ message: 'password not match' })

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.jwt,
    )

    const { password, isAdmin, ...otherDetails } = user._doc
    return res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, token, isAdmin })
  } catch (err) {
    return res.sendStatus(400)
  }
}

//forget password
const forgetpaasword = async (req, res) => {
  try {
    const { email_Id } = req.body
    const olduser = await User.findOne({ email: email_Id })
    if (!olduser) {
      return res.json({ message: 'email doesnot Exists....' })
    }
    const secret = process.env.jwt + olduser.password

    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, {
      expiresIn: '50m',
    })
    const link = `http://localhost:3001/resetpassword/${olduser._id}/${token}`

    //send mail
    sendEmail({
      email: olduser.email,
      subject: 'testing',
      link: link,
    })
    res.json(' please check your email')
  } catch (err) {
    console.log(err)
  }
}

//reset password

const resetpassword = async (req, res) => {
  const { id, token } = req.params
  const { pwd, conpwd } = req.body

  const olduser = await User.findOne({ _id: id })
  if (!olduser) {
    return res.json('not valid user')
  }
  const secret = process.env.jwt + olduser.password

  try {
    const verify = jwt.verify(token, secret)
    if (pwd == conpwd) {
      const hashpwd = await bcrypt.hash(pwd, 10)
      await User.updateOne({ _id: id }, { password: hashpwd })
    }

    res.json({ message: 'success', olduser })
  } catch (err) {
    console.log(err)
  }
}

const getallUser = async (req, res) => {
  allUser = await User.find()
  if (!allUser) return res.json('no user found')
  res.json(allUser)
}

const updateQuery = async (req, res) => {
  const id = req.params.id
  const { query } = req.body

  try {
    const user = await User.findByIdAndUpdate(id, {
      query: query,
    })
    await user.save()
    if (!user) return res.Status(404)
    return res.json({ message: user })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const getAllQuery = async (req, res) => {
  try {
    const userQuery = await User.find(
      {},
      { query: 1, email: 1, username: 1, _id: 0 },
    )

    if (!userQuery) return res.Status(404)
    return res.json({ message: userQuery })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
module.exports = {
  register,
  login,
  forgetpaasword,
  resetpassword,
  getallUser,
  updateQuery,
  getAllQuery,
}
