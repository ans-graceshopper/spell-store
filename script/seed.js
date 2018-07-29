'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Spell} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {Review} = require('../server/db/models')
//const {SpellOrders} = require('../server/db/models')
const allSpells = require('../server/seed/spellseed')

// necessary for sequelize functions such as and/or
// see http://docs.sequelizejs.com/manual/tutorial/querying.html
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function userSeed() {
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'admin@email.com', password: '123', isAdmin: true}),
  ])

  console.log(`seeded ${users.length} users`)

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
}

const spellSeed = async () => {
  for (let i = 0; i < allSpells.length; i++) {
    //console.log(allSpells[i])
    try {
      await Spell.create(allSpells[i])
    } catch (err) {
      console.log(err)
    }
  }
  console.log(`seeded ${allSpells.length} spells`)
}

const createOrders = async () => {
  try {
    // SELECT * FROM Spell WHERE id = 12 OR id = 13;
    const spells = await Spell.findAll({
      where: {
        id: {
          [Op.or]: [1, 2, 3],
        },
      },
    })

    const users = await User.findAll()

    const order1 = await Order.create({isCart: true, status: 'open'})
    const order2 = await Order.create({isCart: false, status: 'submitted'})
    const order3 = await Order.create({isCart: false, status: 'completed'})
    const order4 = await Order.create({isCart: false, status: 'shipped'})

    await order1.addSpells(spells)
    await order2.addSpells(spells)
    await order3.addSpells(spells)
    await order4.addSpells(spells)

    await order1.setUser(users[0])
    await order2.setUser(users[0])
    await order3.setUser(users[0])
    await order4.setUser(users[0])

    console.log('Orders Seeded Successfully!')
  } catch (err) {
    console.log('ERROR: ', err)
  }
}

const createReviews = async () => {
  try {
    const spell = await Spell.findById(1)

    const cody = await User.findById(1)
    //const murray = await User.findById(2)

    const review1 = await Review.create({
      title: 'Wow!',
      content: 'this spell is the best!',
      rating: 5,
    })

    const review2 = await Review.create({
      title: 'OMG LAME!',
      content: 'this spell is so fake!! I would give it zero stars if I could!',
      rating: 1,
    })

    await review1.setUser(cody)
    await review2.setUser(cody)

    await spell.addReviews([review1, review2])

    await console.log('Reviews Seeded Successfully!')
  } catch (err) {
    console.log('ERROR: ', err)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await db.sync({force: true})
    console.log('db synced!')

    await userSeed()
    await spellSeed()
    await createOrders()
    await createReviews()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
//const seed = () => {
if (module === require.main) {
  runSeed()
}
//}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = runSeed
