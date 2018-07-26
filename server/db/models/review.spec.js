const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')
const reviewData = {
  content: 'This is the best spell ever!!',
  rating: 5,
}
let testReview

describe('Review model', () => {
  beforeEach(() => {
    testReview = Review.build(reviewData)
  })
  afterEach(() => {
    return Review.truncate({cascade: true})
  })

  describe('A review', () => {
    it('includes content and rating fields', () => {
      return testReview.save().then(savedReview => {
        expect(savedReview.content).to.equal('This is the best spell ever!!')
        expect(savedReview.rating).to.equal(5)
      })
    })

    it('content cannot be an empty string', () => {
      testReview.content = ''

      return testReview.validate().then(
        () => {
          throw new Error(
            'validation should fail when content is an empty string'
          )
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('rating must be a number between 0 and 5', () => {
      testReview.rating = 6

      return testReview.validate().then(
        () => {
          throw new Error(
            'validation should fail when rating is greater than 5'
          )
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('requires content to not be null', () => {
      testReview.content = null

      return testReview.validate().then(
        () => {
          throw new Error('validation should fail when content does not exist')
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('requires content to be at least 10 characters', () => {
      testReview.content = 'Fail'

      return testReview.validate().then(
        () => {
          throw new Error('validation should fail when content is too short')
        },
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })
  })
}) // end describe('Review model')
