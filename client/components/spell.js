import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
const Spell = props => {
  const {spell} = props
  return (
    <li>
      <p>{spell.title}</p>
      <NavLink to={`/spells/${spell.id}/edit`}>Edit</NavLink>
    </li>
  )
}
export default Spell
