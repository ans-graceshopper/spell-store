import React from 'react'
import Spell from './spell'
const SpellList = props => {
  const {spells} = props
  return (
    <div className="card-deck">
      {spells.map(spell => (
        <Spell key={spell.id} spell={spell} className="card" />
      ))}
    </div>
  )
}

export default SpellList
