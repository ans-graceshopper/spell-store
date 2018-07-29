import React from 'react'

const OrderDetail = props => {
  const spells = props.spells
  if (!spells) return <div />
  return !spells ? (
    <div />
  ) : (
    <div>
      <h3>Order Details</h3>
      <table>
        <tbody>
          <tr>
            <th>Spell</th>
            <th>Spell Description</th>
            <th>Spell Skill Level</th>
            <th>School of Magic</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {spells.map(spell => {
            return (
              <tr key={spell.id}>
                <td>{spell.name}</td>
                <td>{spell.description}</td>
                <td>skill</td>
                <td>school</td>
              </tr>
            )
          })}
          <tr>
            <td>TOTAL: {`Total price here`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderDetail
