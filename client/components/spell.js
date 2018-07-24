import React, {Component} from 'react'
const Spell = props => {
  return (
    <li>
      <p>{props.spell.title}</p>
    </li>
  )
}
export default Spell
