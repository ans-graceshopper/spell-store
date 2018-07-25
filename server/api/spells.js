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

router.get('/:id', async (req, res, next) => {
  try {
    const spells = await Spell.findById(req.params.id)
    res.json(spells)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const spell = await Spell.create(req.body)
      res.status(201).json(spell)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
//  V middleware for securing routes goes here
router.put('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const spell = await Spell.findById(req.params.id)
      if (!spell) {
        const err = new Error('Spell not found!')
        err.status(404)
        return next(err)
      }
      const updatedSpell = await spell.update(req.body)
      res.json(updatedSpell)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// add to cart route by spell id??
