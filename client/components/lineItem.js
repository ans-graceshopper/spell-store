import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../store'

const LineItem = props => {
  const {spell, removeSpell} = props
  //console.log('ORDERS', spell.orders)
  return (
    <div>
      <h3>{spell.title}</h3>
      <p>Quantity: {}</p>
      <p>Price: {}</p>
      <button onClick={() => removeSpell(spell)}>Remove</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  removeSpell: spell => dispatch(removeFromCart(spell)),
})

export default connect(null, mapDispatchToProps)(LineItem)
