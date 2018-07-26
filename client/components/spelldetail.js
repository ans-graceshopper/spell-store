import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
const SpellDetail = props => {
  console.log('SPELLDETAILPROPS:', props)
  const {spell, user} = props
  return (
    <div>
      <img src={spell.images[0]} />

      <h4>{spell.title}</h4>
      <h5>Price: {spell.price} gold</h5>
      <h5>Magic School: {spell.magic_school}</h5>
      <h5>Skill Level: {spell.skill_level} gold</h5>
      <h5>Price: {spell.price} gold</h5>

      <h2>Reviews: {spell.reviews}</h2>
      {user.isAdmin ? (
        <NavLink to={`/spells/${spell.id}/edit`}>Edit</NavLink>
      ) : (
        <button className="btn-default" type="button">
          Add to Cart (NOT WORKING)
        </button>
      )}
      <NavLink className="btn-default" to={`/spells/${spell.id}`} spell={spell}>
        Details
      </NavLink>
    </div>
  )
}

const mapStateToProps = state => ({user: state.user})
export default connect(mapStateToProps)(SpellDetail)
