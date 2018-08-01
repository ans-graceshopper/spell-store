const router = require('express').Router()
const {Order, Spell, SpellOrders} = require('../db/models')
module.exports = router

// Session helper functions
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

Order.findOrCreateCart = user => {
  return Order.findOrCreate({
    where: {
      userId: user.id,
      isCart: true,
    },
    include: [{model: Spell}],
  })
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
    let orderedSpellData
    if (req.user) {
      const [order] = await Order.findOrCreateCart(req.user)
      await order.addSpell(spell, {
        through: {
          quantity: req.body.quantity,
          price: spell.price,
        },
      })
      orderedSpellData = await SpellOrders.findOne({
        where: {spellId: req.params.spellId, orderId: order.id},
      })
    } else {
      if (!req.session.cart) {
        createSessionCart(req)
      }
      const spells = req.session.cart.spells
      orderedSpellData = {
        quantity: +req.body.quantity,
        price: spell.price,
      }
      // search for current spell in spells array
      const foundSpell = spells.find(sp => sp.id === spell.dataValues.id)
      // if found, do a map and change the quantity
      if (foundSpell) {
        req.session.cart.spells = spells.map(sp => {
          if (sp.id === +req.params.spellId) {
            return {
              ...sp,
              spellorders: orderedSpellData,
            }
          } else return sp
        })
      } else {
        // if not found, simply push to copy of spells array
        req.session.cart.spells.push({
          ...spell.dataValues,
          spellorders: orderedSpellData,
        })
      }
    }
    res.json([spell, orderedSpellData])
  } catch (err) {
    next(err)
  }
})

// delete entire spell item from the cart
router.delete('/:spellId', async (req, res, next) => {
  try {
    if (req.user) {
      const spell = await Spell.findById(req.params.spellId)
      const [order] = await Order.findOrCreateCart(req.user)
      await order.removeSpell(spell)
      res.json(order)
    } else {
      const spells = req.session.cart.spells
      req.session.cart.spells = spells.filter(
        spell => spell.id !== +req.params.spellId
      )
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})
