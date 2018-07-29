const router = require('express').Router()
const {Order, Spell} = require('../db/models')
module.exports = router

const createSessionCart = req => {
  req.session.cart = {
    order: {
      isCart: true,
      status: 'open',
    },
    spells: [],
    sessionId: req.session.id,
  }
  return req.session.cart
}

// get cart for a user if logged in, or from session if guest
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const [order] = await Order.findOrCreateCart(req.user)
      res.json(order)
    } else {
      if (!req.session.cart) {
        createSessionCart(req)
      }
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

// add or update a spell in cart
router.put('/:spellId', async (req, res, next) => {
  try {
    const spell = await Spell.findById(req.params.spellId)
    if (req.user) {
      const [order] = await Order.findOrCreateCart(req.user)
      await order.addSpell(spell, {
        through: {
          quantity: req.body.quantity,
          price: spell.price,
        },
      })
      res.json(order)
    } else {
      if (!req.session.cart) {
        createSessionCart(req)
      }
      // if adding for the first time
      req.session.cart.spells = [
        ...req.session.cart.spells,
        {
          ...spell,
          spellorders: {
            quantity: req.body.quantity,
            price: spell.price,
          },
        },
      ]
      // if already in the session cart
      req.session.cart.spells = req.session.cart.spells.map(elem => {
        if (elem.id === req.params.spellId) {
          return {
            ...elem,
            spellorders: {
              quantity: req.body.quantity,
              price: elem.price,
            },
          }
        } else return elem
      })
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

// delete all quantities of spell from the cart at once
router.delete('/:spellId', async (req, res, next) => {
  try {
    if (req.user) {
      const spell = await Spell.findById(req.params.spellId)
      const [order] = await Order.findOrCreateCart(req.user)
      await order.removeSpell(spell)
      res.json(order)
    } else {
      req.cart.spells = req.cart.spells.filter(
        spell => spell.id !== +req.params.id
      )
    }
  } catch (err) {
    next(err)
  }
})
