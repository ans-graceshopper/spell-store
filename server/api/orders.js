const router = require('express').Router()
const {Order, Spell, SpellOrders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
})
