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

  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },

  price: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.ENUM('Novice', 'Apprentice', 'Adept', 'Expert', 'Master'),
    allowNull: false,
    validate: {notEmpty: true},
  },

  magicka_cost: {
    type: Sequelize.STRING,
  },
})

// DOESN'T WORK BUT WE'LL NEED SOMETHING LIKE THIS
// Spell.prototype.checkout = quantity => {
//   return Spell.update(
//     {
//       inventory: this.inventory - quantity,
//     },
//     {
//       where: {id: this.id},
//     }
//   )
// }

module.exports = Spell

// add instance method to get average of reviews
