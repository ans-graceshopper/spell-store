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
  } = spell
  return spell ? (
    <div className="main container">
      <div className="card mt-4">
        <img className="card-img-top img-fluid" src={images[0]} />
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <h4>{price} gold</h4>
          <p>In stock</p>
          <p className="card-text">{description}</p>
          <p clasName="card-text">Magic School: {magic_school}</p>
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
          {/* map through reviews and return the p, small, and hr elements below for each one */}
          <p>Review content goes here</p>
          <small className="text-muted">Posted by Reviewer Name</small>
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
