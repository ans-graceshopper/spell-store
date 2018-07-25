const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  // explicitly define in through table
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1, // after added to order so defaults to one
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

// price and quantity will be part of the line item - product and user IDs will be set in associations
// how should we add: "Orders must belong to a user OR guest session (authenticated vs unauthenticated)"

module.exports = Order
