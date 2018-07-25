const User = require('./user')
const Spell = require('./spell')
const Order = require('./order')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)

Spell.belongsToMany(Order, {through: 'spellorders'})
Order.belongsToMany(Spell, {through: 'spellorders'})

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Spell)
Spell.hasMany(Review)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Spell,
  Order,
  Review,
}
