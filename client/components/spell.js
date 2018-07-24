import React, {Component} from 'react'
const Spell = props => {
  const {images, key} = props
  return (
    <li key={key}>
      <p>{props.name}</p>
    </li>
  )
}
export default Spell
