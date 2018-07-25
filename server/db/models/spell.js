const Sequelize = require('sequelize')
const db = require('../db')

const Spell = db.define('spell', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true},
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      'https://img4.wikia.nocookie.net/__cb20120706201912/finalfantasy/images/7/77/Black_Mage_Shibuya.png',
    ],
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // remove; add to review model, add instance method to get average of reviews
  rating: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
      max: 5.0,
    },
  },
  price: {
    type: Sequelize.INTEGER, // change to int; store as cents (smallest possible unit)
    get() {
      return this.getDataValue('price') / 100
    }, // TODO make price getter more robust
  },
  // make own table for extensibility; in short term make enum
  magic_school: {
    type: Sequelize.ENUM(
      'Alteration',
      'Conjuration',
      'Destruction',
      'Restoration'
    ),
    allowNull: false,
    validate: {notEmpty: true},
  },
  skill_level: {
    type: Sequelize.ENUM('Novice', 'Adept', 'Expert', 'Master'),
    allowNull: false,
    validate: {notEmpty: true},
  },
  magicka_cost: {
    type: Sequelize.STRING,
  },
})

module.exports = Spell
