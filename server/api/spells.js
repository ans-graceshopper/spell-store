const router = require('express').Router()
const {Spell, Review, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const spells = await Spell.findAll({include: {model: Review}})
    res.json(spells)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const spell = await Spell.findById(req.params.id, {
      include: {model: Review},
    })
    res.json(spell)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {spellId: req.params.id},
      include: [User],
    })
    res.json(reviews)
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
