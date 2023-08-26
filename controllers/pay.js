const express = require('express')
const dotenv = require('dotenv').config()
const stripe = require('stripe')(process.env.strip_key)

const pay = async (req, res) => {
  try {
    const data = req.body
    const price = parseInt(data.total)
    const a = [data]
    const lineItems = a.map((data) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: data.email,
        },
        unit_amount: price * 100,
      },
      quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://dapper-cucurucho-7b2a5e.netlify.app/success',
      cancel_url: 'https://dapper-cucurucho-7b2a5e.netlify.app/failed',
    })

    res.json({ id: session.id })
  } catch (err) {
    res.json(err)
  }
}

module.exports = pay
