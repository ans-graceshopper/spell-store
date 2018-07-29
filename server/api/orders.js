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

// CURRENTLY LIVES IN THE USERS.JS ROUTE FILE - SHOULD MOVE TO HERE AND UPDATE THUNKS
// router.get('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id)
//     const orderHistory = await user.getOrders()
//     res.json(orderHistory)
//   } catch (err) {
//     next(err)
//   }
// })
