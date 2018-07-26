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
    <div>
      <img src={images[0]} />

      <h4>{title}</h4>
      <p>{description}</p>
      <h5>In stock: {quantity}</h5>
      <h5>Price: {price} gold</h5>
      <h5>Magic School: {magic_school}</h5>
      <h5>Skill Level: {skill_level} </h5>

      {user.isAdmin ? (
        <NavLink to={`/spells/${id}/edit`}>Edit</NavLink>
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
