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

// Order.prototype.getTotal = async function() {
//   const orderSpells = await this.getSpells()
//   console.log('models/order instance method', orderSpells.spellorders)
//   return orderSpells.reduce((total, sp) => {
//     return total + sp.spellorders.quantity * sp.spellorders.price
//   }, 0)
// }
module.exports = Order
