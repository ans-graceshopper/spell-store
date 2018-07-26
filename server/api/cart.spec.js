/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const Spell = db.model('spell')
const User = db.model('user')

const testOrder = {
  isCart: true,
  status: 'open',
}

describe('Cart routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    const user = await User.create({name: 'cody', email: 'cody@email.com'})
    const spell1 = await Spell.create({
      title: 'fake spell',
      description: 'the fakest spell',
      magic_school: 'Conjuration',
      skill_level: 'Novice',
    })

    const spell2 = await Spell.create({
      title: 'fake spell2',
      description: 'the most fakest spell',
      magic_school: 'Conjuration',
      skill_level: 'Novice',
    })

    const newOrder = await Order.create(testOrder)
    newOrder.addSpells([spell1, spell2])
    newOrder.setUser(user)
  })

  describe('/api/cart/', () => {
    beforeEach(async () => {})

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200)

      // expect(res.body).to.be.an('array')
      // expect(res.body).to.be.equal(spell1)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

//
