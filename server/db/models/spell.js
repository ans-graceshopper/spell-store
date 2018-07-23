const Sequelize = require('sequelize')
const db = require('../db')

const Spell = db.define('spell', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://img4.wikia.nocookie.net/__cb20120706201912/finalfantasy/images/7/77/Black_Mage_Shibuya.png',
  },
  stock: { type: Sequelize.INTEGER, allowNull: false },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: { min: 0.0, max: 5.0 },
  },
})

module.exports = Spell
