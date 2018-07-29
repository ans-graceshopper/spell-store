const router = require('express').Router()
const {Order, Spell, SpellOrders} = require('../db/models')
module.exports = router

/*
  cart goal for both logged in and sessions
  req.cart = {
    order: {
      isCart: true,
      status: 'open',
    },
    spells: [],
  }
 */

/*
  middleware to:

  initialize req.session.cart to the above format for ALL users

  if user is logged in, i.e. exists in the database, cart.order is initialized to an Order associated with them where isCart: true. if there is an already existing order associated with them, it is found instead of created and cart is initialized to it.

  if user is not logged in, i.e. does not exist in the database, no interaction with the database occurs. cart.order is initialized to an object with the same structure as one an existing order WOULD have, so we can interact with it as we would a real Order, and pass it to Order.create() with no issues.

  for both cases, req.cart points to req.session.cart, for ease of use.
*/

router.use('/', async (req, res, next) => {
  try {
    if (req.user) {
      const [order, created] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          isCart: true,
        },
      })
      req.cart = {}
      req.cart.order = order
      req.cart.spells = await order.getSpells()
    } else {
      if (!req.session.cart) {
        req.session.cart = {
          order: {
            isCart: true,
            status: 'open',
          },
          spells: [],
          sessionId: req.session.id,
        }
      }
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
    console.log('CART IN API ROUTE', req.cart)
    res.json(req.cart)
  } catch (err) {
    next(err)
  }
})

// add a spell to cart PUT route edits order Order.addSpell() ?
router.put('/', async (req, res, next) => {
  // console.log(`\nREQUEST BODY:`, req.body)
  try {
    const spell = await Spell.findOne({
      where: {id: req.body.id},
      include: [{model: Order, through: SpellOrders}],
    })
    if (req.user) {
      await req.cart.order.addSpell(spell)
    } else {
      req.cart.spells.push(spell)
    }
    res.json(req.cart)
  } catch (err) {
    next(err)
  }
})

// edit a spell that's in the cart aka change quantity
router.put('/:spellId', async (req, res, next) => {
  try {
    if (req.user) {
      const cartSpell = await SpellOrders.findOne({
        where: {
          spellId: req.params.spellId,
          orderId: req.cart.order.id,
        },
      })
      const updated = await cartSpell.update(req.body)
      res.json(updated)
    } else {
      req.cart.spells = req.cart.spells.map(spell => {
        if (spell.id === req.body.id) return req.body
        else return spell
      })
      res.json(req.body)
    }
  } catch (err) {
    next(err)
  }
})

// add to cart POST route creates order tagged isCart
// this method is intended to be called after user checks out, thus their cart must be archived
// router.post('/', async (req, res, next) => {
//   try {
//     if (req.user) {
//       const newOrder = await Order.create({isCart: true}) // make sure previous instance of Order model with isCart: true gets changed to false after new cart is initialized
//       res.status(201).json(newOrder)
//     } else {
//       req.session.cart = []
//       req.cart = req.session.cart
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// delete a spell from the cart destroys a line item Order.removeSpell() ?
// update to check if
router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const currentSpell = req.cart.spells.find(
        spell => spell.id === +req.params.id
      )
      await req.cart.order.removeSpell(currentSpell)
    } else {
      req.cart.spells = req.cart.spells.filter(
        spell => spell.id !== +req.params.id
      )
    }
  } catch (err) {
    next(err)
  }
})
