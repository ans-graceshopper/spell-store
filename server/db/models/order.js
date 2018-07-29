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
})

// price and quantity will be part of the line item - product and user IDs will be set in associations
// how should we add: "Orders must belong to a user OR guest session (authenticated vs unauthenticated)"

Order.findOrCreateCart = user => {
  return Order.findOrCreate({
    where: {
      userId: user.id,
      isCart: true,
    },
    include: [{all: true}],
  })
}

module.exports = Order
