import React from 'react'
import Spell from './spell'
const SpellList = props => {
  const {spells} = props
  return <ul>{spells.map(spell => <Spell key={spell.id} spell={spell} />)}</ul>
}

export default SpellList
