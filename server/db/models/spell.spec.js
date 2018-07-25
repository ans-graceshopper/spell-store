/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Spell = db.model('spell')
const spellData = {
  title: 'fake spell1',
  description: 'a fake spell',
  price: 99,
  magic_school: 'Alteration',
  skill_level: 'Expert',
  magicka_cost: '15 points',
}
let testSpell
describe('Spell model', () => {
  beforeEach(() => {
    testSpell = Spell.build(spellData)
  })
  afterEach(() => {
    return Spell.truncate({cascade: true})
  })

  describe('A spell', () => {
    it('includes title and description fields', () => {
      return testSpell.save().then(savedSpell => {
        expect(savedSpell.title).to.equal('fake spell1')
        expect(savedSpell.description).to.equal('a fake spell')
      })
    })

    it('title cannot be an empty string', () => {
      testSpell.title = ''

      return testSpell.validate().then(
        () => {
          throw new Error(
            'validation should fail when title is an empty string'
          )
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('description cannot be an empty string', () => {
      testSpell.description = ''

      return testSpell.validate().then(
        () => {
          throw new Error(
            'validation should fail when description is an empty string'
          )
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('requires description to not be null', () => {
      testSpell.description = null

      return testSpell.validate().then(
        () => {
          throw new Error(
            'validation should fail when description does not exist'
          )
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('requires title to not be null', () => {
      testSpell.title = null

      return testSpell.validate().then(
        () => {
          throw new Error('validation should fail when title does not exist')
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('magic_school category must be a valid category', () => {
      testSpell.magic_school = 'The New School'
      return testSpell.validate().then(
        () => {
          throw new Error(
            'validation should fail when magic school is not one of some predetermined magic schools'
          )
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('skill_level category must be a valid category', () => {
      testSpell.skill_level = 'Archmage'
      return testSpell.validate().then(
        () => {
          throw new Error(
            'validation should fail when skill_level is not one out of some predetermined skill levels'
          )
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })
  })
}) // end describe('User model')
