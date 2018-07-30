const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const {Order, Spell} = require('../db/models')
module.exports = router

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body.metadata .............', req.body.metadata)
    stripe.charges.create(req.body, postStripeCharge(res))
    //const formerCart = await Order.findById(req.body.metadata.id)
    //await formerCart.update({isCart: false, status: 'submitted'})
  } catch (e) {
    next(e)
  }
})
