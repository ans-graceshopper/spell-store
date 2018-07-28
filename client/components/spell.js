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
        <h5 className="card-title">
          <NavLink to={`/spells/${spell.id}`}>{spell.title}</NavLink>
        </h5>
        <p>{spell.price} gold</p>
        {user.isAdmin ? (
          <NavLink className="btn btn-danger" to={`/spells/${spell.id}/edit`}>
            Edit
          </NavLink>
        ) : (
          <div />
        )}
      </div>
      <div className="card-footer">
        <button
          onClick={() => addSpellToCart(spell)}
          className="btn btn-primary"
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
