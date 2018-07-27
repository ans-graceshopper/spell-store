import React from 'react'
import {connect} from 'react-redux'

const OrderDetails = props => {
  const {spells} = props.order
  if (!spells) return <div />
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Spell</th>
            <th>Spell Description</th>
            <th>Spell Skill Level</th>
            <th>School of Magic</th>
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
        </tbody>
      </table>
    </div>
  )
}

const OrderList = props => {
  const {orders} = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Order #</th>
            <th>Order Status</th>
            <th>Order Detail</th>
          </tr>

          {props.orders.map(order => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>Order Detail (tbd)</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const UserOrders = props => {
  const {user, orders} = props
  return (
    <div>
      <h3>Orders</h3>
      {orders ? (
        <div>
          <OrderList user={user} orders={orders} />
          <OrderDetails order={orders[0]} />
        </div>
      ) : (
        <h3>no orders.</h3>
      )}
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    orders: state.user.orders,
  }
}

export default connect(mapState)(UserOrders)
