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
    const spell = await Spell.create(req.body)
    res.status(201).json(spell)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const spell = await Spell.findById(req.params.id)
    if (!spell) {
      const err = new Error('Spell not found!')
      err.status(404)
      return next(err)
    }
    const updatedSpell = await spell.update(req.body)
    res.json(updatedSpell) // TODO status
  } catch (err) {
    next(err)
  }
})
