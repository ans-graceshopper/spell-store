const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  status: {
    type: Sequelize.ENUM('open', 'submitted', 'paid', 'shipped', 'completed'),
    allowNull: false,
    defaultValue: 'open',
  },
  total: {
    type: Sequelize.INTEGER,
  },
})

// Order.findOrCreateCart = user => {
//   return Order.findOrCreate({
//     where: {
//       userId: user.id,
//       isCart: true,
//     },
//     include: [{all: true}],
//   })
// }

module.exports = Order
