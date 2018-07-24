const router = require('express').Router()
const {Spell} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const spells = await Spell.findAll()
    res.json(spells)
  } catch (err) {
    next(err)
  }
})
