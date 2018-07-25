const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return this.getDataValue('price') / 100 // TODO make price more robust
    },
  },
  // explicitly define in through table

  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  status: {
    type: Sequelize.ENUM('open', 'submitted', 'paid', 'shipped', 'completed'),
    allowNull: false,
  },
})

// price and quantity will be part of the line item - product and user IDs will be set in associations
// how should we add: "Orders must belong to a user OR guest session (authenticated vs unauthenticated)"

module.exports = Order
