const Sequelize = require('sequelize')
const db = require('../db')

const Spell = db.define('spell', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      'https://img4.wikia.nocookie.net/__cb20120706201912/finalfantasy/images/7/77/Black_Mage_Shibuya.png'
    ]
  },
  quantity: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {min: 0.0, max: 5.0}
  },
  description: {type: Sequelize.TEXT},
  price: {type: Sequelize.FLOAT}
})

module.exports = Spell
