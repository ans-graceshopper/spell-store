const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const Spell = require('../db/models/spell')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email},
      include: {model: Order, include: [Spell]},
    })

    if (req.session.cart) {
      const cart = await Order.findOne({where: {userId: user.id, isCart: true}})
      req.session.cart.spells.forEach(async spell => {
        const currentSpell = await Spell.findById(+spell.id)
        await cart.addSpell(currentSpell, {
          through: {
            quantity: spell.spellorders.quantity,
            price: currentSpell.price,
          },
        })
      })
    }

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      console.log(req.login)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    if (req.session.cart) {
      const cart = await Order.create(req.session.cart.order)
      await cart.setUser(user)
      req.session.cart.spells.forEach(async spell => {
        const currentSpell = await Spell.findById(+spell.id)
        await cart.addSpell(currentSpell, {
          through: {
            quantity: spell.spellorders.quantity,
            price: currentSpell.price,
          },
        })
      })
    }
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
