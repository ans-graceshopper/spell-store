import React from 'react'
import {connect} from 'react-redux'

const OrderDetail = props => {
  const {user} = props
  if (!user) return <div>loading user...</div>
  const {orders} = user
  if (!orders) return <div>loading orders...</div>
  console.log(orders, props.match.params.id)
  const order = orders.find(ord => ord.id === +props.match.params.id)
  if (!order) return <div>loading order...</div>
  const {spells} = order
  return !spells ? (
    <div />
  ) : (
    <div>
      <h3>Order Details</h3>
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th>Spell</th>
            <th>Spell Description</th>
            <th>Spell Skill Level</th>
            <th>School of Magic</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
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
            <td>TOTAL: {`Orders no longer have Spells array?`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapState = state => ({user: state.user})
export default connect(mapState)(OrderDetail)
