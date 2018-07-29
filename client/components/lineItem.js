import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../store'

const LineItem = props => {
  const {spell, removeSpell} = props
  // console.log('SPELL', spell)
  return (
    <div>
      <h3>{spell.title}</h3>
      <p>Quantity: {spell.spellorders.quantity}</p>
      <p>Price: {spell.spellorders.price}</p>
      <button onClick={() => removeSpell(spell)}>Remove</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  removeSpell: spell => dispatch(removeFromCart(spell)),
})

export default connect(null, mapDispatchToProps)(LineItem)
