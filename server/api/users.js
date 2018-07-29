const router = require('express').Router()
const {User, Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get all orders for logged in user
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const orderHistory = await user.getOrders()
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

// get all orders for logged in user
router.get('/:id/orders', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id},
      include: [Order],
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})
