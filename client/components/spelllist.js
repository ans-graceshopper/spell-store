import React from 'react'
import Spell from './spell'
export const SpellList = props => {
  const {spells} = props
  return <ul>{spells.map(spell => <Spell key={spell.id} spell={spell} />)}</ul>
}
