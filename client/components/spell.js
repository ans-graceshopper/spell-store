import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {addToCart} from '../store'

const Spell = props => {
  const {spell, user, addSpellToCart} = props
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
          <div />
        )}
        <button
          onClick={() => addSpellToCart(spell)}
          className="btn-default"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({user: state.user, spells: state.spells})

const mapDispatchToProps = dispatch => ({
  addSpellToCart: spell => dispatch(addToCart(spell)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Spell)
