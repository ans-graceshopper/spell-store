const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
module.exports = router

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

router.get('/', (req, res, next) => {
  try {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString(),
    })
  } catch (e) {
    next(e)
  }
})

router.post('/', (req, res, next) => {
  try {
    stripe.charges.create(req.body, postStripeCharge(res))
  } catch (e) {
    next(e)
  }
})
