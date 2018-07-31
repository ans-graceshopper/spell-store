const Sequelize = require('sequelize')
const db = require('../db')

const SpellOrders = db.define('spellorders', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = SpellOrders
