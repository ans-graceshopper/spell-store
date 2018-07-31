const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const {Order, Spell} = require('../db/models')
module.exports = router

const postStripeCharge = (res, req) => async (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
    const formerCart = await Order.findById(req.body.metadata.id)
    await formerCart.update({
      isCart: false,
      status: 'paid',
      total: req.body.amount,
    })
    // deduct inventory with metadata.spells
    const spells = await formerCart.getSpells()
    spells.forEach(async spell => {
      await spell.update({
        inventory: spell.inventory - spell.spellorders.quantity,
      })
    })
  }
}

router.post('/', (req, res, next) => {
  try {
    console.log('METADATA::::::::::::::', req.body.metadata)
    stripe.charges.create(req.body, postStripeCharge(res, req))
  } catch (e) {
    next(e)
  }
})
