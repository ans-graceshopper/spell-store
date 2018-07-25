const Sequelize = require('sequelize')
const db = require('../db')

const SpellOrders = db.define('spellorders', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1, // after added to order so defaults to one
  },
  priceAtOrder: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = SpellOrders
