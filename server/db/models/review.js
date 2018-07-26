const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      min: 10,
    },
  },
  // make integer
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5,
    },
  },
})

// TODO add hook to update overall Spell rating when a review is submitted

module.exports = Review
