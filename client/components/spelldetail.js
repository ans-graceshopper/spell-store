import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
const SpellDetail = props => {
  const {spells, user, match} = props
  const spellId = match.params.id
  const spell = spells.find(spl => spl.id === Number(spellId))

  const {
    title,
    description,
    quantity,
    images,
    id,
    price,
    magic_school,
    skill_level,
    reviews,
  } = spell
  const avgRating = reviews
    .map(review => review.rating)
    .reduce((a, b) => (a + b) / reviews.length)
  return spell ? (
    <div className="main container">
      <div className="card mt-4">
        <img className="card-img-top img-fluid img-detail" src={images[0]} />
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <h4>{price} gold</h4>
          <p>In stock</p>
          <p className="card-text">{description}</p>
          <p className="card-text">Magic School: {magic_school}</p>
          <p>Skill Level: {skill_level} </p>

          {user.isAdmin ? (
            <NavLink className="btn btn-danger" to={`/spells/${id}/edit`}>
              Edit
            </NavLink>
          ) : (
            <button className="btn btn-primary" type="button">
              Add to Cart (NOT WORKING)
            </button>
          )}
        </div>
      </div>
      <div className="card card-outline-secondary my-4">
        <div className="card-header">Reviews</div>
        <div className="card-body">
          {reviews ? (
            <div>
              <h3>
                {avgRating} stars based on {reviews.length} reviews.
              </h3>

              <ul className="list-group">
                {reviews.map(review => {
                  return (
                    <li className="list-group-item" key={review.id}>
                      <h5>{'*'.repeat(+review.rating)}</h5>
                      <h6>{review.rating}</h6>
                      <p>{review.content}</p>
                      <small className="text-muted">Posted by user</small>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <div>No reviews.</div>
          )}
          <hr />
          <a href="#" className="btn btn-success">
            Leave a Review
          </a>
        </div>
      </div>
    </div>
  ) : (
    <h4>Loading...</h4>
  )
}

const mapStateToProps = state => ({user: state.user, spells: state.spells})

export default connect(mapStateToProps)(SpellDetail)
