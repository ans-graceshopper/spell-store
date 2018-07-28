import React from 'react'
import Spell from './spell'

const SpellList = props => {
  const {spells} = props

  return (
    <div id="spell-list" className="card-group">
      {spells.map(spell => <Spell key={spell.id} spell={spell} />)}
    </div>
  )
}

export default SpellList
