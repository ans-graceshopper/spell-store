const router = require('express').Router()
const {Order, Spell, SpellOrders} = require('../db/models')
module.exports = router

// middleware to check if logged in ????
router.use('/', async (req, res, next) => {
  try {
    if (req.user) {
      // just the current cart order
      req.cart = await Order.findOne({
        where: {
          userId: req.user.id,
          isCart: true
        }
      })
      // returns an array of spell line items if user is logged in
      req.cart.spells = await req.cart.getSpells()
    } else {
      // if not logged in, cart is just an array of spell line items
      req.cart = req.session.cart
    }
    next()
  } catch (err) {
    next(err)
  }
})

// get cart for a user if logged in, or from session if guest
router.get('/', (req, res, next) => {
  try {
    if (req.user) {
      res.json(req.cart.spells)
    } else {
      res.json(req.cart)
    }
  } catch (err) {
    next(err)
  }
})

// add a spell to cart PUT route edits order Order.addSpell() ?
router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const spell = Spell.findById(req.body.id)
      await req.cart.addSpell(spell)
      res.json(req.cart)
    } else {
      req.cart = [...req.cart, req.body]
    }
  } catch (err) {
    next(err)
  }
})

// edit a spell that's in the cart
router.put('/:spellId', async (req, res, next) => {
  try {
    if (req.user) {
      const cartSpell = await SpellOrders.findOne({
        where: {
          spellId: req.params.spellId,
          orderId: req.cart.id
        }
      })
      const updated = await cartSpell.update(req.body)
      res.json(updated)
    } else {
      req.cart = [...req.cart, req.body]
    }
  } catch (err) {
    next(err)
  }
})

// add to cart POST route creates order tagged isCart
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const newOrder = await Order.create({isCart: true})
      res.status(201).json(newOrder)
    } else {
      req.session.cart = []
    }
  } catch (err) {
    next(err)
  }
})

// remove cart DELETE route ??
// router.delete('/', async (req, res, next) => {
//
// })

// delete a spell from the cart destroys a line item Order.removeSpell() ?
router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const currentSpell = req.cart.spells.find(spell => spell.id === +req.params.id)
      await req.cart.removeSpell(currentSpell)
    } else {
      req.cart = req.cart.filter(spell => spell.id !== +req.params.id)
    }
  } catch (err) {
    next(err)
  }
})
