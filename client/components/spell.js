import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
const Spell = props => {
  const {spell, user} = props
  return (
    <div className="card">
      <img className="card-img-top" src={spell.images[0]} />
      <div className="card-body">
        <NavLink className="btn-default" to={`/spells/${spell.id}`}>
          {spell.title}
        </NavLink>
        <h5>Price: {spell.price} gold</h5>
        {user.isAdmin ? (
          <NavLink to={`/spells/${spell.id}/edit`}>Edit</NavLink>
        ) : (
          <button className="btn-default" type="button">
            Add to Cart (NOT WORKING)
          </button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({user: state.user, spells: state.spells})
export default connect(mapStateToProps)(Spell)
