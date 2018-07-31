const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{all: true}],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/spells', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    const orderSpells = await order.getSpells()
    res.json(orderSpells)
  } catch (err) {
    next(err)
  }
})
