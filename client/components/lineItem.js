import React from 'react'

const LineItem = props => {
  const {spell} = props
  // console.log("LINE ITEM", spell)
  return (
    <div>
      <h3>{spell.title}</h3>
      <p>Quantity: {spell.spellorders.quantity}</p>
      <p>Price: {spell.spellorders.price * spell.spellorders.quantity}</p>
      <button>Remove (NOT WORKING YET)</button>
    </div>
  )
}

export default LineItem
