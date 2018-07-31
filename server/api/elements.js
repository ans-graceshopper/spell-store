const router = require('express').Router()
const {Element} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const elements = await Element.findAll()
    res.json(elements)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const ele = await Element.findOrCreate()
    res.json(ele)
  } catch (err) {
    next(err)
  }
})
