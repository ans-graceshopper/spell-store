const Sequelize = require('sequelize')
const db = require('../db')

const Element = db.define('element', {
  title: {
    type: Sequelize.STRING,
  },
})

module.exports = Element
