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
    set(currentPrice) {
      return this.setDataValue('price', currentPrice * 100)
    },
    get() {
      return this.getDataValue('price') / 100
    },
  },
})

module.exports = SpellOrders
