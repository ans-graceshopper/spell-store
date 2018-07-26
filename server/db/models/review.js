const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 2000],
    },
  },

  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      max: 5,
    },
  },
})

// TODO add hook to update overall Spell rating when a review is submitted
// sh: I believe this will be done in an eager loading on the Spell axios request

module.exports = Review
