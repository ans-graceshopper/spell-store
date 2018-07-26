import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
const Spell = props => {
  const {spell, user} = props
  return (
    <div className="card">
      <img className="card-img-top" src={spell.images[0]} />
      <div className="card-body">
        <h4 className="card-title">{spell.title}</h4>
        <h5>Price: {spell.price} gold</h5>
        {user.isAdmin ? (
          <NavLink to={`/spells/${spell.id}/edit`}>Edit</NavLink>
        ) : (
          <button className="btn-default" type="button">
            Add to Cart (NOT WORKING)
          </button>
        )}
        <NavLink
          className="btn-default"
          to={`/spells/${spell.id}`}
          spell={spell}
        >
          Details
        </NavLink>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({user: state.user})
export default connect(mapStateToProps)(Spell)
