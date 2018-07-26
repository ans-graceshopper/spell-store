import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
const SpellDetail = props => {
  const {spells, user, match} = props
  const spellId = match.params.id
  const spell = spells.find(spl => spl.id === Number(spellId))
  return spell ? (
    <div>
      <img src={spell.images[0]} />

      <h4>{spell.title}</h4>
      <h5>Price: {spell.price} gold</h5>
      <h5>Magic School: {spell.magic_school}</h5>
      <h5>Skill Level: {spell.skill_level} </h5>

      {user.isAdmin ? (
        <NavLink to={`/spells/${spell.id}/edit`}>Edit</NavLink>
      ) : (
        <button className="btn-default" type="button">
          Add to Cart (NOT WORKING)
        </button>
      )}
    </div>
  ) : (
    <h4>Loading...</h4>
  )
}

const mapStateToProps = state => ({user: state.user, spells: state.spells})

export default connect(mapStateToProps)(SpellDetail)
