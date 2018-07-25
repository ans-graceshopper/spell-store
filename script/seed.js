'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Spell} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {SpellOrders} = require('../server/db/models')
const allSpells = require('../server/seed/spellseed')

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
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123'}),
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
    const spell0 = await Spell.findById(0)
    const spell1 = await Spell.findById(1)
    const spell2 = await Spell.findById(2)

    const cody = await User.findById(1)
    //console.log(cody)

    const order1 = await Order.create({isCart: true, status: 'open'})

    await order1.setUser(cody)

    await order1.addSpell(spell0)

    console.log('Orders Seeded Successfully!')
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
