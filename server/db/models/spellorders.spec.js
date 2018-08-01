/* global describe beforeEach it */

const {expect} = require('chai')
const {db, Spell, Order, SpellOrders} = require('./index')
const spellData = {
  title: 'fake spell1',
  description: 'a fake spell',
  price: 99,
  magic_school: 'Alteration',
  skill_level: 'Expert',
  magicka_cost: '15 points',
}
let testSpell, testOrder
describe('Spell model', () => {
  beforeEach(async () => {
    testSpell = await Spell.create(spellData)
    testOrder = await Order.create({isCart: true})
  })
  afterEach(async () => {
    await Spell.truncate({cascade: true})
    await SpellOrders.truncate({cascade: true})
    await Order.truncate({cascade: true})
  })

  describe('A spell line item', () => {
    it('does not add a new lineItem if the same spell is added multiple times', async () => {
      await testOrder.addSpell(testSpell)
      await testOrder.addSpell(testSpell)
      const foundOrder = await Order.findById(testOrder.id, {
        include: [{model: Spell}],
      })

      let spells = await SpellOrders.findAll({where: {orderId: foundOrder.id}})
      expect(spells).to.have.lengthOf(1)
    })

    it('updates quantity of the lineItem when the corresponding spell is added multiple times', async () => {
      await testOrder.addSpell(testSpell)

      const foundOrder = await Order.findById(testOrder.id, {
        include: [{model: Spell}],
      })

      let spells = await SpellOrders.findAll({where: {orderId: foundOrder.id}})

      expect(spells[0].quantity).to.equal(1)

      await testOrder.addSpell(testSpell)

      spells = await SpellOrders.findAll({where: {orderId: foundOrder.id}})

      expect(spells[0].quantity).to.equal(2)
    })
  })
})
